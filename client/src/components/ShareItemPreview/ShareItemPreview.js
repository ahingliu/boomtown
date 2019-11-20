import React, { Component } from 'react';
import { ItemPreviewContext } from '../../context/ItemPreviewProvider'


export class ShareItemPreview extends Component {
  
  render() {
    return (
      <ItemPreviewContext.Consumer>
          {({ state }) => (
              <div>
                  <img scr={this.state.imgUrl} />
                  <h1>{this.state.title}</h1>
                  <h1>{state.desc}</h1> 
              </div>
    )}
      </ItemPreviewContext.Consumer>
    )
  }
}

export default ShareForm;