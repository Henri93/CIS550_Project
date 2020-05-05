import React from 'react';
import cookie from 'react-cookies'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../style/header.css"
import Autocomplete from 'react-autocomplete';
import { withRouter } from "react-router-dom";

class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
		this.state = {
			navDivs: [],
			searchTerm: "",
			autocompleteData: []
		}

		//autocomplete functions
		this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
	}

	handleLogout(event) {
		console.log("Handle logout")
		cookie.remove('user', { path: '/' })
	}

	// invoked when the user types something. A delay of 200ms is
	// already provided to avoid DDoS'ing your own servers
	onChange(e) {
		this.setState({
            searchTerm: e.target.value
        });

		console.log("search " + this.state.searchTerm)
		//Handle the remote request
		if(this.state.searchTerm !== "" && this.state.searchTerm.length > 3){
			
			fetch('/getSearch?term=' + this.state.searchTerm, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			})
				.then(response => response.json())
				.then(data => {
					if (data.success) {
						//successful
						console.log(data.result)
						this.setState({
							autocompleteData: data.result
						});
					} else {
						//display error msg
						console.log("Fail to search for autocomplete!")
					}
				})
		}
	}

	// called when the user clicks an option or hits enter
	onSelect(e) {
		let selected = this.state.autocompleteData.find(obj => {
			return obj.id === e
		})

		console.log(this.props)
		
		if(selected.type === "user"){
			//send to profile page
			this.props.history.push('/profile/'+selected.id);
		}else{
			//send to business page
			this.props.history.push('/business/'+selected.id);
		}

		return e;
	}


	componentDidMount() {
		const pageList = ['Map', 'My Profile', 'Reccomendations'];
		const user_id = this.props.loggedInUser.user_id;
		let hrefs = ['', 'profile/' + user_id, 'reccomendations/' + user_id];
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
							<form className="form-inline md-form mr-auto" style={{ "zIndex":"1000", "marginLeft":"25%" }}>
								<Autocomplete
									wrapperStyle={{ position: 'relative', display: 'inline-block' }}
									inputProps={{ placeholder:"Enter a restaurant, store, etc", ariaLlabel:"Search", style: { width: "20vw", marginRight: "1vw", height: "3.5vh", paddingLeft:"0.5vw"} }}
									className="form-control mr-sm-2"
									placeholder="Enter a restaurant, store, etc"
									getItemValue={item => item.id}
									value={this.state.searchTerm}
									items={this.state.autocompleteData}
									onChange={this.onChange}
									onSelect={this.onSelect}
									renderItem={(item, isHighlighted) => (
									<div
										style={{"fontSize":"1.3rem", "cursor":"grab"}}
										className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
										key={item.id} >
											<p className="typeIcon">{item.type.toUpperCase()[0]}</p>
											<p className = "resultText">{item.name}</p>
										
									</div>
								)}
								/>
								{/* <input style={{ "width": "20vw" }} className="form-control mr-sm-2" type="text" placeholder="Enter a restaurant, store, etc" aria-label="Search" /> */}
								<a href="/" type="submit" style={{ "color": "orange", fontSize: "1.35em" }} id="errSpan"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></a>

							</form>
						}
					</div>



					<button className="navbar-toggler"  data-toggle="collapse" data-target=".navbar-collapse"
						aria-controls=".navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item dropdown">
								<a style={{ "cursor": "grab" }} className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
									aria-haspopup="true" aria-expanded="false">
									<i className="fas fa-user"></i> {this.props.loggedInUser.username} Profile </a>
								<div className="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
									<a className="dropdown-item" href={'/profile/' + this.props.loggedInUser.user_id}>My account</a>
									<a className="dropdown-item" href={'/reccomendations/' + this.props.loggedInUser.user_id}>Reccomendations</a>
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

export default withRouter(PageNavbar);