import React, { useReducer, useState, useContext} from 'react';
import {createRecipe, updateRecipe} from "../../services/apiCalls";
import {useLocation, useNavigate} from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './CreateRecipe.css';
import {
    IconButton,
    Box,
    Button,
    Grid,
    InputAdornment,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import {CATEGORY_OPTIONS, DIFFICULTY_OPTIONS, MEASUREMENTS_OPTIONS} from "../../assets/constants";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import useFetchRecipes from "../../hooks/useFetchRecipes";
import AppContext from "../../store/AppContext";

const CreateRecipe = (props) => {
    const {fetchRecipes} = useFetchRecipes();
    const { setMsg, setOpen} = useContext(AppContext);

    const navigate = useNavigate();
    const location = useLocation();
    const isEdit = props.isEdit;
    const initialState = {
        recipeName: isEdit ? location.state.recipeData.recipeName: '',
        recipeCategory: isEdit ? location.state.recipeData.recipeCategory: '',
        cookingTime: isEdit ? location.state.recipeData.cookingTime: '',
        portionSize: isEdit ? location.state.recipeData.portionSize: '',
        difficulty: isEdit ? location.state.recipeData.difficulty: '',
        ingredientLi: isEdit ? location.state.recipeData.ingredients
            : [{amount: "", unit: "", item: ""}],
        stepsList: isEdit ? location.state.recipeData.steps: [{stepDescription: ""}]
    }

    const formReducer =  (state, action) => {
        switch (action.type) {
            case 'field': {
                return {
                    ...state,
                    [action.fieldName]: action.payload,
                };
            } case 'list': {
                const {name, value} = action.payload;
                const list = [...action.fieldName];
                list[action.index][name] = value;
                return {
                    ...state,
                    [action.fieldName]: list
                }
            }
            case 'add': {
                const list = [...action.fieldName, action.payload];
                return {
                    ...state,
                    [action.name]: list
                }
            }
            case 'remove': {
                const list = [...action.fieldName];
                list.splice(action.index, 1);
                return {
                    ...state,
                    [action.name]: list
                }
            }
            default: {}
        }
    }

    const init = (initialState) => {
        return {
            ...initialState
        }
    }

    const [state, dispatch] = useReducer(formReducer, initialState, init);
    const { recipeName, recipeCategory, cookingTime, portionSize, difficulty, ingredientLi, stepsList } = state;

    const [image, setImage] = useState(isEdit ? location.state.recipeData.image:'');
    const [errorCheck, setErrorCheck] = useState(false);

    const trimIngredientsList = (list) => {
        return list.filter(entry => {return entry.amount.trim().length !== 0 && entry.unit.trim().length !== 0
            && entry.item.trim().length !== 0 });
    }

    const trimStepsList = (list) => {
        return list.filter(entry => {return entry.stepDescription.trim().length !== 0});
    }

    const validateFormInput = () => {
        setErrorCheck(true);
        if (recipeName.trim().length !== 0 &&
            recipeCategory.trim().length !== 0 &&
            cookingTime.trim().length !== 0 &&
            difficulty.trim().length !== 0 &&
            portionSize.trim().length !== 0 &&
            ingredientLi && stepsList){
            return trimIngredientsList(ingredientLi).length !== 0
                && trimStepsList(stepsList).length !== 0;
        }
        return false;
    }

    const formSubmissionHandler = event => {
        event.preventDefault();
        if (validateFormInput()) {
            setErrorCheck(false);
            let recipeObject = {
                'recipeName': recipeName,
                'recipeCategory': recipeCategory,
                'cookingTime': cookingTime,
                'difficulty': difficulty,
                'portionSize': portionSize,
                'ingredients': trimIngredientsList(ingredientLi),
                'steps': trimStepsList(stepsList),
                'image': image
            }

            const requestOptions = {
                method: isEdit ? 'PUT' : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(recipeObject),
                credentials: 'include'
            };

            if (isEdit) {
                updateRecipe(requestOptions, location.state.recipeData._id)
                    .then((res) => {
                        if(res.ok){
                            setMsg('Successfully updated recipe');
                            setOpen(true);
                        }
                        fetchRecipes();
                        navigate('/');
                    })
                    .catch(() => {
                        setMsg("Recipe couldn't be updated, please try again later ");
                        setOpen(true);
                    });
            } else {
                createRecipe(requestOptions)
                    .then((res) => {
                        if(res.ok){
                            setMsg('Successfully created recipe');
                            setOpen(true);
                        }
                        fetchRecipes();
                        navigate('/');
                    })
                    .catch(() => {
                        setMsg("Recipe couldn't be created, please try again later ");
                        setOpen(true);
                    })
            }
        } else {
        }
    }

    return (
        <form onSubmit={formSubmissionHandler} noValidate={true}>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={3} className={'create__spacing'}>
                        <Typography variant={"h6"} color={"secondary"}>
                            01
                        </Typography>
                        <Typography variant={"h5"}>
                            Recipe Details
                        </Typography>
                    </Grid>
                    <Grid item xs={9} className={'create__spacing'}>
                        <div>
                            <div className={'create__flex'}>
                                <TextField
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="normal"
                                    label={"Recipe Name"}
                                    required
                                    size={'small'}
                                    value={recipeName}
                                    onChange={(e) => dispatch({
                                        type: 'field',
                                        fieldName: 'recipeName',
                                        payload: e.target.value
                                    })}
                                    error={errorCheck && recipeName.trim().length === 0}
                                />
                            </div>
                            <div className={'create__flex'}>
                                <TextField
                                    fullWidth={true}
                                    id="category"
                                    size={'small'}
                                    select
                                    required
                                    label="Category"
                                    value={recipeCategory}
                                    onChange={(e) => dispatch({
                                        type: 'field',
                                        fieldName: 'recipeCategory',
                                        payload: e.target.value
                                    })}
                                    error={errorCheck && recipeCategory.trim().length === 0}
                                >
                                    {CATEGORY_OPTIONS.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth={true}
                                    size={'small'}
                                    variant="outlined"
                                    type="number"
                                    margin="normal"
                                    label={"Cooking Time"}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">min</InputAdornment>,
                                    }}
                                    required
                                    value={cookingTime}
                                    onChange={(e) => dispatch({
                                        type: 'field',
                                        fieldName: 'cookingTime',
                                        payload: e.target.value
                                    })}
                                    error={errorCheck && cookingTime.trim().length === 0}
                                />
                            </div>
                            <div className={'create__flex'}>
                                <TextField
                                    fullWidth={true}
                                    size={'small'}
                                    id="difficulty"
                                    select
                                    required
                                    label="Difficulty"
                                    value={difficulty}
                                    onChange={(e) => dispatch({
                                        type: 'field',
                                        fieldName: 'difficulty',
                                        payload: e.target.value
                                    })}
                                    error={errorCheck && difficulty.trim().length === 0}
                                >
                                    {DIFFICULTY_OPTIONS.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth={true}
                                    size={'small'}
                                    variant="outlined"
                                    type="number"
                                    margin="normal"
                                    label={"Portion Size"}
                                    required
                                    value={portionSize}
                                    onChange={(e) => dispatch({
                                        type: 'field',
                                        fieldName: 'portionSize',
                                        payload: e.target.value
                                    })}
                                    error={errorCheck && portionSize.trim().length === 0}
                                />
                            </div>
                            <div className={'create__flex'}>
                                <ImageUpload setImage={setImage}/>
                            </div>
                            {
                                isEdit && location.state.recipeData.image &&
                                <div>

                                    <img alt={'dish photo'}  className={'isEditImage'}
                                         src={"data:image/jpeg;base64," + location.state.recipeData.image}/>
                                    <Typography variant={'caption'} className={'create__block'}>current recipe image</Typography>
                                </div>
                            }
                        </div>
                    </Grid>
                    <Grid item xs={3} className={'create__spacing'}>
                        <Typography variant={"h6"} color={"secondary"}>
                            02
                        </Typography>
                        <Typography variant={"h5"}>
                            Ingredients
                        </Typography>
                    </Grid>
                    <Grid item xs={9} className={'create__spacing'}>
                        <div>
                            {ingredientLi.map((element, index) => (
                                <div className="form-inline" key={index}>
                                    <div className={'create__flex'}>
                                        <TextField
                                            size={'small'}
                                            variant="outlined"
                                            type="number"
                                            margin="normal"
                                            label={"Amount"}
                                            required={index === 0}
                                            onChange={
                                                (e) => dispatch({
                                                    type: 'list',
                                                    fieldName: ingredientLi,
                                                    index: index,
                                                    payload: e.target,
                                                })
                                            }
                                            value={element.amount}
                                            name={"amount"}
                                            fullWidth={true}
                                            error={errorCheck && index === 0 && element.amount.trim().length === 0}
                                        />
                                        <TextField
                                            fullWidth={true}
                                            size={'small'}
                                            id="unit"
                                            select
                                            margin="normal"
                                            required={index === 0}
                                            name={"unit"}
                                            label="Unit"
                                            value={element.unit || ""}
                                            onChange={
                                                (e) => dispatch({
                                                    type: 'list',
                                                    fieldName: ingredientLi,
                                                    index: index,
                                                    payload: e.target,
                                                })
                                            }
                                            error={errorCheck && index === 0 && element.unit.trim().length === 0}
                                        >
                                            {MEASUREMENTS_OPTIONS.map((option) => (
                                                <MenuItem key={option.value} value={option.value} name={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            fullWidth={true}
                                            size={'small'}
                                            variant="outlined"
                                            margin="normal"
                                            label={"Item"}
                                            required={index === 0}
                                            onChange={
                                                (e) => dispatch({
                                                    type: 'list',
                                                    fieldName: ingredientLi,
                                                    index: index,
                                                    payload: e.target,
                                                })
                                            }
                                            value={element.item || ""}
                                            name={"item"}
                                            error={errorCheck && index === 0 && element.item.trim().length === 0}
                                        />
                                        {
                                            index ?
                                                <IconButton
                                                    onClick={() => dispatch({
                                                        type: 'remove',
                                                        fieldName: ingredientLi,
                                                        index: index,
                                                        name: 'ingredientLi'
                                                    })}>
                                                    <DeleteOutlineIcon/>
                                                </IconButton>
                                                : null
                                        }
                                    </div>
                                </div>
                            ))}
                            <Button variant="outlined" onClick={() => dispatch({
                                type: 'add',
                                fieldName: ingredientLi,
                                payload: {amount: '', unit: '', item: ''},
                                name: 'ingredientLi'
                            })}>
                                Add another
                                ingredient
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={3} className={'create__spacing'}>
                        <Typography variant={"h6"} color={"secondary"}>
                            03
                        </Typography>
                        <Typography variant={"h5"}>
                            Instructions
                        </Typography>

                    </Grid>
                    <Grid item xs={9} className={'create__spacing'}>
                        <div>
                            {stepsList.map((element, index) => (
                                <div key={index}>
                                    <div className={'create__flex'}>
                                        <TextField
                                            fullWidth={true}
                                            size={'small'}
                                            id="outlined-multiline-flexible"
                                            label={'Step ' + (index + 1)}
                                            multiline
                                            required={index === 0}
                                            value={element.stepDescription || ""}
                                            name={'stepDescription'}
                                            onChange={
                                                (e) => dispatch({
                                                    type: 'list',
                                                    fieldName: stepsList,
                                                    index: index,
                                                    payload: e.target,
                                                })
                                            }
                                            error={errorCheck && index ===0 && element.stepDescription.trim().length === 0}
                                        />
                                        {
                                            index ?
                                                <IconButton onClick={() => dispatch({
                                                    type: 'remove',
                                                    fieldName: stepsList,
                                                    index: index,
                                                    name: 'stepsList'
                                                })}>
                                                    <DeleteOutlineIcon/>
                                                </IconButton>
                                                : null
                                        }
                                    </div>
                                </div>
                            ))}
                            <Button className={'create__button__spacing'}
                                    variant="outlined"
                                    onClick={() => dispatch({
                                        type: 'add',
                                        fieldName: stepsList,
                                        payload: {stepDescription: ''},
                                        name: 'stepsList'
                                    })}
                            >Add another
                                step
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={3} className={'create__spacing'}>
                    </Grid>
                    <Grid item xs={9} className={'create__spacing'}>
                        {
                            errorCheck &&
                            <Typography variant={'caption'} color={'error'}>
                                Please fill in all required fields marked with '*'
                            </Typography>
                        }
                        <Button
                            fullWidth={true} variant={"contained"} type={"submit"}>
                            { isEdit ? 'Update Recipe' : 'Create Recipe'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default CreateRecipe;