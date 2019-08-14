import React, {Component} from 'react';
import {Menubar} from 'primereact/menubar';
import {Button} from 'primereact/button';

export default class nav extends Component {
        render() {
          return(
            <Menubar>
                {this.props.user ?  <Button label="Logout" icon="pi pi-power-off" onClick={this.props.logout} 
                style={{marginLeft:4}}/> : ''}
            </Menubar>
         )
 }
}
