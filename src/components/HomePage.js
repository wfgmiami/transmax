import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {usStates} from '../us-states';
import classNames from 'classnames';
import validate from "./validate";
import ImageSection from "./ImageSection";

const styles = theme => ({
 root: {
    [theme.breakpoints.up('md')]: {
        display:'flex', 
        justifyContent:'space-between'
    },
  },
  imageSection: {
    display: 'flex',
    justifyContent: 'center'
  },
  cascadiaImage:{
    flex: '1 1 auto'
  },
  flexContainer: {
      margin: '20px auto 0 auto'
  },
  flexSection:{
    padding: '20px', 
    boxSizing:'border-box', 
    flexBasis:'50%', 
    marginBottom: '20px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "45%"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "45%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  mainText: {
    fontFamily: "Times New Roman, Times, serif",
    fontSize: "26px"
  },
});

const experienceRange = [
    "less than 2 years",
    "from 2 to 5 year",
    "more than 5 years"
];

class HomePage extends Component {
  
    state = {
        candidate: {
          firstName: "",
          lastName: "",
          city: "",
          state: "",
          email: "",
          phone: "",
          driverslicense: "",
          experience: ""
        }
      };
            
    handleSubmit = () => {
        let errorMsg = null;
        const { candidate } = this.state;
        
        const validationObj = validate(this.state.candidate);
        const validationArray = Object.keys(validationObj);
        const requiredViolation = validationArray.findIndex(
          field => validationObj[field] === "Required"
        );

        validationObj.email === "Invalid email address"
          ? errorMsg = 'Invalid email address'
          : null;
        validationObj.phone === "Invalid phone number"
          ? errorMsg = 'Invalid phone number'
          : null;
    
        if (requiredViolation !== -1)
            errorMsg = validationArray[requiredViolation] + " is a required field";

        if(!errorMsg)
            this.props.onCreate(candidate);  
        else
            alert(errorMsg);
    };

    handleChange = key => ({target: {value}}) =>{
        
        this.setState({
            candidate: {
                ...this.state.candidate, 
                [key]: value 
            }
        })
    }

    render(){
        const {classes} = this.props;
       
        return (
            <div>
                <div className={classNames(classes.root, classes.flexContainer)}>
              
                    <div className={classes.flexSection}>
                    <h1 className="py-16">WE PAY UP TO $0.55 CENTS PER MILE</h1><br/>
                        <p className={classes.mainText}>
                            Transmax is a transportation company founded by a truck driver that knows what is takes to be a trucker. 
                            We want our drivers to earn the most money in the industry!<br/>
                            Do not spend days on the road without being adequately compensated for your hard work - contact us today!<br/>
                            You can just call us at 513-680-5334 or fill in the short form on the right and we will be in touch with you.<br/>
                            All you need is a CDL and a minimum of 2 years experience!
                            Apply today and start earning one of the highest rates on the market!<br/><br/>
                        </p>
                    </div>
        
                    <div className={classes.flexSection}>
                        <h1 className="py-16">DRIVER'S APPLICATION</h1><br/>
                        <form>
                            <TextField
                                id="firstName"
                                label="First Name"
                                className={classes.textField}
                                value={this.state.candidate.firstName}
                                onChange={this.handleChange('firstName')}
                                margin="normal"
                            />
                            <TextField
                                id="lastName"
                                label="Last Name"
                                className={classes.textField}
                                value={this.state.candidate.lastName}
                                onChange={this.handleChange('lastName')}
                                margin="normal"
                            />
                            <TextField
                                id="email"
                                label="Email"
                                className={classes.textField}
                                value={this.state.candidate.email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                            />
                            <TextField
                                id="phone"
                                label="Phone"
                                className={classes.textField}
                                value={this.state.candidate.phone}
                                onChange={this.handleChange('phone')}
                                margin="normal"
                            />
                            <TextField
                                id="city"
                                label="City"
                                className={classes.textField}
                                value={this.state.candidate.city}
                                onChange={this.handleChange('city')}
                                margin="normal"
                            />
                            
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="state-simple">State</InputLabel>
                                    <Select
                                        value={this.state.candidate.state}
                                        onChange={this.handleChange('state')}
                                        inputProps={{
                                            name: 'state',
                                            id: 'state-simple',
                                        }}>
                                    
                                        { Object.keys(usStates).map( (stateAbbr,id) => 
                                            (<MenuItem key={id} value={stateAbbr}>{usStates[stateAbbr]}</MenuItem>)
                                        )}
                                    </Select>
                            </FormControl>
                            <TextField
                                id="dlicense"
                                label="Driver's License"
                                className={classes.textField}
                                value={this.state.candidate.driverslicense}
                                onChange={this.handleChange("driverslicense")}
                                margin="normal"
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="experience-simple">Experience</InputLabel>
                                <Select
                                value={this.state.candidate.experience}
                                onChange={this.handleChange("experience")}
                                inputProps={{
                                    name: "experience",
                                    id: "experience-simple"
                                }}
                                >
                                {experienceRange.map((rng, id) => (
                                    <MenuItem key={id} value={rng}>
                                    {rng}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                 
                        </form>
                        <br/><br/>
                        <Button
                            color="primary"
                            variant="raised"
                            onClick={()=>this.handleSubmit()}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
                <ImageSection />
         
            </div>
        );
        
    }

}

export default withStyles(styles)(HomePage);
