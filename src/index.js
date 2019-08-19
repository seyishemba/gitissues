import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import firebase from './config.js';


function Header(){

	return(
			<div className="row header">
			<div className="col-1">
				<Link to={'/'}>
				<button className="btn btn-default">Home</button>
        		</Link>
			</div>
			<div className="col-9">
				<input type="text" name="search" placeholder="Search..." className="form-control"/>
			</div>
			<div className="col-2">
				<Link to={'/new/choose'}>
				<button className="btn btn-success">New Issue</button>
        		</Link>
        	</div>
			</div>
		);
}
class IssuesList extends React.Component{

	constructor(){
	super();
	this.state = {
		issue: []
	}
	

}

componentDidMount(){

		const issueRef = firebase.database().ref('issues');
		issueRef.on('value', snap =>{
		var issues = snap.val();

	    var newState = [];
	    var key = 0;

	    for (var issue in issues) {
		    	key ++;
					      newState.push({
							        id: key,
							        title: issues[issue].title
					      });
	    }

		 this.setState ({
		     	 issue: newState
		    });
		console.log(newState);
		console.log(this.state);

  });
	}


render(){

	return(
		<ul class="list-group">
				 {this.state.issue.map(list => (
		  		 <Link to={'/issues/'+list.title}>
	  				<li class="list-group-item">
		        		{list.title}
					</li>
		        </Link>
      				))}
		</ul>
		)
}

}


function Issue({match}){
	const issueRef = firebase.database().ref('issues');
		return(
			<div>
				<h1>
					{match.params.id}
					{match.params.content}
				</h1>
			</div>
		);
}


function NewIssue(){
	
	return(
			<div>
			<h6>
				Create New Issue
			</h6>
			<h1>
				Select Issue Type
			</h1>
			<hr />
				<Link to={'/new/bug'}>
				<button className="btn btn-default issuebtn">Bug Report</button>
        		</Link>
        		<Link to={'/new/documentation'}>
				<button className="btn btn-default issuebtn">Documentation</button>
        		</Link>
        		<Link to={'/new/support'}>
				<button className="btn btn-default issuebtn">Support</button>
        		</Link>
        		<Link to={'/new/feature-request'}>
				<button className="btn btn-default issuebtn">Feature Request</button>
        		</Link>
			</div>
		);
}

class NewBugIssue extends React.Component{

			constructor(){
			super();
			this.state ={ 
				title : '',
				content : ''
			}
	
	 	this.handleChange = this.handleChange.bind(this);
  		this.handleSubmit = this.handleSubmit.bind(this);


}
handleSubmit(e) {
	  e.preventDefault();
	  const issueRef = firebase.database().ref('issues');
	  const issue = {
	    title: this.state.title,
	    content: this.state.content
	  }
	  issueRef.push(issue);
	  var aftersubmit = '/issues/'+this.state.title;
	  window.location.href = aftersubmit;
	  this.setState({
	    title: '',
	    content: ''
	  });
}

	handleChange(e) {
	  this.setState({
	    [e.target.name]: e.target.value
	  });
}
render(){
	return(

			<div>
			<h3 className="header">
			New Bug Issue
			</h3>
			<hr />
			<div className="col-4">
				<form onSubmit={this.handleSubmit}>
					Title: <input type="text" className="form-control" name="title" onChange={this.handleChange} /><br/>
					Body: <textarea name="content" className="form-control" onChange={this.handleChange} ></textarea><br/>
					<button className="btn btn-success">Submit Issue</button>
				</form>
			</div>
			</div>
		);
}
}

function NewDocumentationIssue(){
	return(
			<div>
				<h3 className="header">
					New Documentation Issue
				</h3>
				<hr />
			</div>
		);
}

function NewSupportIssue(){

	return(
			<div>
			<h3 className="header">
				New Support Issue
			</h3>
			<hr />
			</div>
		);
}
function NewFeatureIssue(){

	return(
			<div>
				<h3 className="header">
					New Feature Issue
				</h3>
			<hr />
			</div>
		);
}

ReactDOM.render(
	<Router>
	<div className="wrapper">
  		<Header />

  <Route exact path="/" component={IssuesList} />
  <Route exact path="/issues/:id" component={Issue} />
  <Route exact path="/new/choose" component={NewIssue} />
  <Route exact path="/new/bug" component={NewBugIssue} />
  <Route exact path="/new/documentation" component={NewDocumentationIssue} />
  <Route exact path="/new/support" component={NewSupportIssue} />
  <Route exact path="/new/feature-request" component={NewFeatureIssue} />
  	</div>
	</Router>
  		,
  document.getElementById('root')
);
