const { AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 120 * 6000
  })
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user
  return jwt.sign({ id, email, fullname, bio }, secret, { expiresIn: '2h' })
}

module.exports = app => ({
  async signup(parent, args, context) {
    try {
      const hashedPassword = await bcrypt.hash(args.user.password, 10)

      const user = await context.pgResource.createUser({
        fullname: args.user.fullName,
        email: args.user.email,
        password: hashedPassword
      })

      const token = generateToken(user, app.get('JWT_SECRET'))
      setCookie({
        tokenName: app.get('JWT_COOKIE_NAME'),
        token,
        res: context.req.res
      })

      return { token, user }
    } catch (e) {
      throw new AuthenticationError(e)
    }
  },

  async login(
    parent,
    {
      user: { email, password }
    },
    { pgResource, req }
  ) {
    try {
      const user = await pgResource.getUserAndPasswordForVerification(email)
      if (!user) throw 'User was not found.'
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) throw 'Invalid Password'

      const token = generateToken(user, app.get('JWT_SECRET'))

      setCookie({
        tokenName: app.get('JWT_COOKIE_NAME'),
        token,
        res: req.res
      })

      return {
        token,
        user
      }
    } catch (e) {
      throw new AuthenticationError(e)
    }
  },

  logout(parent, args, context) {
    context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'))
    return true
  },
  async addItem(parent, args, context, info) {
    const user = await jwt.decode(context.token, app.get('JWT_SECRET'))
    const newItem = await context.pgResource.saveNewItem({
      item: args.item,
      user
    })
    return newItem
  }
})