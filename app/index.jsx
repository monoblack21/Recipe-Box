import React from 'react';
import ReactDOM from 'react-dom';

require('./style.scss');

function ListGenerator(props){
    let list = props.list.map((item, index) =>{
        if(props.nestNum == index){
            return <li key={index} onClick={() => props.click(index)}>{item}<Nestedlist list={props.nested[index]} handleDelete={props.handleDelete} index={index}/> </li>;
        }
        return <li key={index} onClick={() => props.click(index)}>{item}</li>
    });
    return <ul>{list}</ul>;
}

function Nestedlist(props){
    let list = props.list.map((item, index) =>{
        return <li key={index}>{item}</li>
    });
    return (
        <div>
            <h2>Ingredients</h2>
            <ul>
                {list}
            </ul>
            <button onClick={() => props.handleDelete(props.index)}>Delete</button>
        </div>
    );
}

class RecipeBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            recipe : [["salmon", "fish", "rice"]],
            ingredients:[[["fish", "gtore"],["nilk", "gore"],["goat"]]],
            isModal: false,
            nestNum: -1,
            recipeVal: "",
            ingredientsVal: "",
        }
        this.handleListClick = this.handleListClick.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    handleListClick(i){
        if(i == this.state.nestNum){
            this.setState({nestNum: -1});
            return
        }

        this.setState({nestNum: i});
    }

    deleteList(i){
        let recipeAll = this.state.recipe.slice(0);
        let recipeCurrent = recipeAll[recipeAll.length - 1].slice(0);
        let ingAll = this.state.ingredients.slice(0);
        let ingCurrent = ingAll[ingAll.length - 1].slice(0);
        recipeCurrent.splice(i, 1);
        ingCurrent.splice(i, 1);
        this.setState({
            recipe: recipeAll.concat([recipeCurrent]),
            ingredients: ingAll.concat([ingCurrent]),
            nestNum: -1
        });
    }

    handleForm(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    render(){
        const arr = this.state.recipe.slice(0);
        const ingredients = this.state.ingredients.slice(0);
        const position = arr.length - 1;
        const nestNum = this.state.nestNum;

        return (
            <div>
                <ListGenerator list={arr[position]} nested={ingredients[position]} nestNum={nestNum} click={this.handleListClick} handleDelete={this.deleteList}/>
                <button>Add Recipe</button>
                <form className={this.state.isModal ? "show" : "hidden"}>
                    <h2>Recipe</h2>
                    <input type='text' name='recipeVal' value={this.state.recipeVal} onChange={this.handleForm}/>
                    <h2>Ingredients</h2>
                    <input type='text' name='ingredientsVal' value={this.state.ingredientsVal} onChange={this.handleForm}/>
                    <button type="button">Add Recipe</button>
                    <button type="button">Close</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <RecipeBox />, document.getElementById('root')
);
