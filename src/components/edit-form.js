import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {fetchRecipes, updateRecipe} from '../actions/recipes';
import Input from './input';
import {required, nonEmpty} from '../validators';



export class EditForm extends React.Component {
    componentWillMount () {
        this.props.initialize({ title:this.props.title, directions: this.props.directions, ingredients:this.props.ingredients, tags:this.props.tags});
      }
    onSubmit(values) {
        const {title, directions, ingredients,tags} = values;
        const recipe = {title, directions, ingredients:ingredients.split(','), tags:tags.split(',')};
        return this.props
            .dispatch(updateRecipe(recipe,this.props.id))
            .then(() => {this.props.showEdit();
            this.props.dispatch(fetchRecipes())})  
    }
  
    render() {

        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="title">Title</label>
                <Field component={Input} type="text" name="title" validate={[required, nonEmpty]}/>

                <label htmlFor="ingredients">Ingredients</label>
                <Field component={Input} type="text" name="ingredients"/>

                <label htmlFor="directions">Directions</label>
                <Field component={Input} type="text" name="directions"/>

                <label htmlFor="tags">Tags</label>
                <Field component={Input} type="text" name="tags"/>
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Submit
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'edit',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('edit', Object.keys(errors)[0]))
})(EditForm);