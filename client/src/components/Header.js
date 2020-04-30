import React from 'react';
import cookie from 'react-cookies'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../style/header.css"
import Autocomplete from 'react-autocomplete'
import { matchCountry, getCountry } from "../utils/autocomplete"

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
		this.state = {
			navDivs: []
		}
	}

	handleLogout(event) {
		console.log("Handle logout")
		cookie.remove('user', { path: '/' })
	}


	componentDidMount() {
		const pageList = ['Map', 'My Profile', 'Reccomendations'];
		const username = this.props.loggedInUser.username;
		let hrefs = ['', 'profile/' + username, 'reccomendations/' + username];
		let navbarDivs = pageList.map((page, i) => {

			if (this.props.active === page) {
				return <a className="nav-item nav-link active" key={i} href={"/" + hrefs[i]}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
			else {
				return <a className="nav-item nav-link" key={i} href={"/" + hrefs[i]}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
		})

		const hide_map = this.props.hide_search == null ? false : true;

		this.setState({
			navDivs: navbarDivs,
			hide_map: hide_map
		});
	}

	render() {
		return (
			<div className="PageNavbar" >
				<nav className="navbar navbar-expand-lg navbar-light bg-light">

					<span style={{ "color": "orange", "letterSpacing": "-0.5rem", "marginTop": "-1.6rem", "marginBottom": "-1.3rem", "fontSize": "3.6rem" }} className="navbar-brand center">ꟻF</span>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							{this.state.navDivs}
						</div>


						{this.state.hide_map &&
							<form className="form-inline md-form mr-auto" style={{ "margin": "auto" }}>
								<Autocomplete
									value={this.state.value}
									inputProps={{ id: 'states-autocomplete' }}
									wrapperStyle={{ position: 'relative', display: 'inline-block' }}
									inputProps={{ placeholder:"Enter a restaurant, store, etc", ariaLlabel:"Search", style: { width: "20vw", marginRight: "1vw", height: "3.5vh", paddingLeft:"0.5vw"} }}
									items={getCountry()}
									className="form-control mr-sm-2"
									placeholder="Enter a restaurant, store, etc"
									getItemValue={item => item.name}
									shouldItemRender={matchCountry}
									onChange={(event, value) => this.setState({ value })}
									onSelect={value => this.setState({ value })}
									renderItem={(item, isHighlighted) => (
									<div
										style={{"fontSize":"1.3rem", "cursor":"grab"}}
										className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
										key={item.abbr} >
										{item.name}
									</div>
								)}
								/>
								{/* <input style={{ "width": "20vw" }} className="form-control mr-sm-2" type="text" placeholder="Enter a restaurant, store, etc" aria-label="Search" /> */}
								<a href="/" type="submit" style={{ "color": "orange", fontSize: "1.35em" }} id="errSpan"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></a>

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
								<a style={{ "cursor": "grab" }} className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
									aria-haspopup="true" aria-expanded="false">
									<i className="fas fa-user"></i> {this.props.loggedInUser.username} Profile </a>
								<div className="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
									<a className="dropdown-item" href={'/profile/' + this.props.loggedInUser.username}>My account</a>
									<a className="dropdown-item" href={'/reccomendations/' + this.props.loggedInUser.username}>Reccomendations</a>
									<a className="dropdown-item" onClick={this.handleLogout} href="/login">Log out</a>
								</div>
							</li>
						</ul>
					</div>

				</nav>
			</div>
		);
	}
}