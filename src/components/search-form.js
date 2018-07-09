import React from 'react';
import {Field, reduxForm, focus, reset} from 'redux-form';
import {connect} from 'react-redux';
import Input from './input';
import {searchRecipes} from '../actions/recipes';




class SearchForm extends React.Component {

  onSubmit(values){
    let searchTerm =values.search;
    if (!searchTerm){
      searchTerm= ''
    }
    this.props.dispatch(searchRecipes(searchTerm));
    
  }

    render() {
      return (
        <form 
            className="search" 
            onSubmit={this.props.handleSubmit(values =>
            this.onSubmit(values))}>
          <div className="search-inputs">
          <label htmlFor="search"></label>
          <Field className="search-box"component={Input} type="text" name="search" />
          <button type="submit" className="search-button">Search</button>
          </div>
        </form>
      );
    }
}




SearchForm = reduxForm({
    form: 'search',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('search', Object.keys(errors)[0]))
})(SearchForm);


export default (connect()(SearchForm));

   // this.props.dispatch(searchRecipes(searchTerm));