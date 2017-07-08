import React from 'react';
import ReactDOM from 'react-dom';

require('./style.scss');

function ListGenerator(props){
    let list = props.list.map((item, index) =>{
        if(props.nestNum == index){
            return <li key={index} onClick={() => props.click(index)}>{item}<Nestedlist list={props.nested[index]} handleUpdateClick={props.handleUpdateClick} handleDelete={props.handleDelete} index={index}/> </li>;
        }
        return <li key={index} onClick={() => props.click(index)}>{item}</li>
    });
    return <ul className="main">{list}</ul>;
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
            <button onClick={()=> props.handleUpdateClick(props.index)}>Update</button>
        </div>
    );
}

function DataChanger(props){
    return(
        <div className="modal">
            <form>
                <h2>Recipe</h2>
                <input type='text' name='recipeVal' value={props.recipeVal} onChange={props.handleForm}/>
                <h2>Ingredients</h2>
                <input type='text' name='ingredientsVal' value={props.ingredientsVal} onChange={props.handleForm}/>
                <div>
                    <button type="button" onClick={props.handleAddRecipe}>{props.button1}</button>
                    <button type="button" onClick={props.handleCloseClick}>Close</button>
                </div>
        </form>

        </div>
    );
}

class RecipeBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            recipe : [["salmon", "fish", "rice"]],
            ingredients:[[["fish", "gtore"],["nilk", "gore"],["goat"]]],
            nestNum: -1,
            recipeVal: "",
            ingredientsVal: "",
            whichForm: false,
            updateNum: null,
        }
        this.handleListClick = this.handleListClick.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.handleAddRecipe = this.handleAddRecipe.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);

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
            nestNum: -1,
        });
    }

    handleForm(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    handleAddClick(){
        this.setState({
            whichForm: "add",
        })
    }

    handleAddRecipe(){
        let recipeVal = this.state.recipeVal.slice();
        let recipeAll = this.state.recipe.slice(0);
        let recipeCurrent = recipeAll[recipeAll.length - 1].slice(0);
        let ingredientsVal = this.state.ingredientsVal.slice().split(',');
        let ingAll = this.state.ingredients.slice(0);
        let ingCurrent = ingAll[ingAll.length - 1].slice(0);

        recipeCurrent.push(recipeVal);
        ingCurrent.push(ingredientsVal);

        this.setState({
            recipe: recipeAll.concat([recipeCurrent]),
            ingredients: ingAll.concat([ingCurrent]),
            recipeVal: "",
            ingredientsVal: "",
        });
    }

    handleUpdateClick(i){
        this.setState({
            whichForm: "update",
            updateNum: i,
        });
    }

    handleUpdate(i){
        let ingredientsVal = this.state.ingredientsVal.slice().split(',');
        let ingAll = this.state.ingredients.slice(0);
        let ingCurrent = ingAll[ingAll.length - 1].slice(0);
        let recipeVal = this.state.recipeVal.slice();
        let recipeAll = this.state.recipe.slice(0);
        let recipeCurrent = recipeAll[recipeAll.length - 1].slice(0);

        ingCurrent.splice(i, 1, ingredientsVal);
        recipeCurrent.splice(i, 1, recipeVal);
        this.setState({
            ingredients: this.state.ingredients.concat([ingCurrent]),
            ingredientsVal: "",
            recipe: this.state.recipe.concat([recipeCurrent]),
        });
    }

    handleCloseClick(){
        this.setState({
            whichForm: null,
        })
    }

    render(){
        let arr = this.state.recipe;
        let ingredients = this.state.ingredients;
        let position = arr.length - 1;
        let nestNum = this.state.nestNum;

        return (
            <div>
                <ListGenerator list={arr[position]} nested={ingredients[position]} nestNum={nestNum} click={this.handleListClick} handleDelete={this.deleteList} handleUpdateClick={this.handleUpdateClick}/>
                <button onClick={this.handleAddClick}>Add Recipe</button>
                {this.state.whichForm == "add" ? (
                     <DataChanger button1={"Add Recipe"} recipeVal={this.state.recipeVal} handleForm={this.handleForm} ingredientsVal={this.state.ingredientsVal} handleAddRecipe={this.handleAddRecipe} handleCloseClick={this.handleCloseClick}/>
                ) : (null)}

            {this.state.whichForm == "update" ? (
                <DataChanger button1={"Update Recipe"}  recipeVal={this.state.recipeVal} handleForm={this.handleForm} ingredientsVal={this.state.ingredientsVal} handleAddRecipe={()=> this.handleUpdate(this.state.updateNum)} handleCloseClick={this.handleCloseClick}/>
            ) : (null)}
            </div>
        );
    }
}

ReactDOM.render(
    <RecipeBox />, document.getElementById('root')
);
