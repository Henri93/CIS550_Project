import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import "../style/header.css"

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: []
		}
	}

	componentDidMount() {
		const pageList = ['Map', 'My Profile', 'Reccomendations'];
		const username = "jacob platin";
		let hrefs = ['', 'profile/' + username,'reccomendations/' + username];
		let navbarDivs = pageList.map((page, i) => {

			if (this.props.active === page) {
				return <a className="nav-item nav-link active" key={i} href={"/" + hrefs[i]}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
			else {
				return <a className="nav-item nav-link" key={i} href={"/" + hrefs[i]}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
		})

		const hide_map = this.props.hide_search  == null ? false : true; 

		this.setState({
			navDivs: navbarDivs,
			hide_map: hide_map
		});
	}

	render() {
		return (
			<div className="PageNavbar" >
				<nav className="navbar navbar-expand-lg navbar-light bg-light">	

			      <span style = {{"color":"orange", "letterSpacing":"-0.5rem","marginTop":"-1.6rem","marginBottom":"-1.3rem" ,"fontSize":"3.6rem"}} className="navbar-brand center">ꟻF</span>
			      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			        <div  className="navbar-nav">
			        {this.state.navDivs}
			        </div>
					{this.state.hide_map &&
						<form className="form-inline md-form mr-auto" style = {{"margin":"auto"}}>
							<input style = {{"width":"20vw"}} className = "form-control mr-sm-2" type="text" placeholder="Enter a restaurant, store, etc" aria-label="Search"/>							
							<a href = "/" type = "submit" style = {{"color":"orange", fontSize:"1.35em"}}id = "errSpan"><FontAwesomeIcon  icon={faSearch}></FontAwesomeIcon></a>
						
						</form>
					}
			      </div>

				

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
    aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <a style = {{"cursor":"grab"}} className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <i  className="fas fa-user"></i> Jacob's Profile </a>
        <div className="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
          <a className="dropdown-item" href="/profile/jacob platin">My account</a>
		  <a className="dropdown-item" href="/reccomendations/jacob platin">Reccomendations</a>
          <a className="dropdown-item" href="/login">Log out</a>
        </div>
      </li>
    </ul>
  </div>
				  
			    </nav>
			</div>
        );
	}
}