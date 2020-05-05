import React from 'react';
import API from '../model';

class HomePage extends React.Component {
  public props: any;
  public state: any;

  constructor(props: any) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      userId: '',
      accessToken: ''
    }
  }

  componentDidMount() {
    this.setState({ userId: this.props.userData.userId,
       accessToken: this.props.userData.accessToken });
  }

  logOut(e: any): void {
    e.preventDefault();

    API.logOut(this.state.accessToken).then(res => {
      if (res.ok) {
        this.props.stateHandler({
          isAuth: false,
          userId: '',
          accessToken: '' 
        });
      } else {
        console.error('Invalid access token');
      }
    }).catch(error => new Error(error));
  }

  render() {
    return (
      <div>
        <h1>
          HomePage
          <button className="btn btn-register ml-2"
          onClick={this.logOut}
          >Log out</button>
        </h1>
      </div>
    );
  }
}

export default HomePage;