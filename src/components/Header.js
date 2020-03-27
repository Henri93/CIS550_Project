import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: []
		}
	}

	componentDidMount() {
		const pageList = ['Map', 'My Profile'];

		let navbarDivs = pageList.map((page, i) => {
			if (this.props.active === page) {
				return <a className="nav-item nav-link active" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
			else {
				return <a className="nav-item nav-link" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
		})

		this.setState({
			navDivs: navbarDivs
		});
	}

	render() {
		return (
			<div className="PageNavbar">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
			      <span style = {{"color":"#ff4a4a"}} className="navbar-brand center">Help Yelp</span>
			      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			        <div  className="navbar-nav">
			        {this.state.navDivs}
			        </div>
					<form className="form-inline md-form mr-auto" style = {{"marginLeft":"25%"}}>
					<input className = "form-control mr-sm-2" type="text" placeholder="Enter a restaurant, store, etc" aria-label="Search"/>
					<button className="btn btn-rounded btn-sm my-0" style={{"borderColor": "#ff4a4a"}} type="submit">Search</button>
					</form>
			      </div>
				  
			    </nav>
			</div>
        );
	}
}