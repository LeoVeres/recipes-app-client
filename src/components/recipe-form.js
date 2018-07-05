import React from 'react';
import {Field, reduxForm, focus, reset} from 'redux-form';
import {createRecipe, fetchRecipes} from '../actions/recipes';
import Input from './input';
import {required, nonEmpty} from '../validators';


export class RecipeForm extends React.Component {
    onSubmit(values) {
        const {title, directions, ingredients} = values;
        const recipe = {title, directions, ingredients:ingredients.split(',')};
        return this.props
            .dispatch(createRecipe(recipe))
            .then(() => this.props.dispatch(fetchRecipes()))
            .then(()=>this.props.dispatch(reset('recipe')));   
    }

    render() {
        return (
            <form
                className="recipe-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="title">Title</label>
                <Field component={Input} type="text" name="title" value="fish" validate={[required, nonEmpty]}/>

                <label htmlFor="ingredients">Ingredients</label>
                <Field component={Input} type="text" name="ingredients"/>

                <label htmlFor="directions">Directions</label>
                <Field component="textarea" type="textarea" element= "textarea" name="directions"/>
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
    form: 'recipe',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('recipe', Object.keys(errors)[0]))
})(RecipeForm);