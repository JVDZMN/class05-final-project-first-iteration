import React, {Component} from 'react'
import './sidebar.css'
import Flip from 'react-reveal/Flip'

class SideBar extends Component {


  render() {
    return (
      <div className='sidebar'>
        <Flip left>
          <img 
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Forsyth_Barr_Building%2C_Christchurch_02.JPG/800px-Forsyth_Barr_Building%2C_Christchurch_02.JPG' 
            className='image'
            alt='' />
          {this.props.text}
        </Flip>
      </div>
    );
  }
}

export default SideBar
