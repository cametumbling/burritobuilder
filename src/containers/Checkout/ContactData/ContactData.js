import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const order = {
     ingredients: this.props.ingredients,
     price: this.props.price,
     customer: {
       name: 'Jill Marcum',
       address: {
         street: '233 Grandview Dr',
         city: 'Redlands',
         state: 'CA',
         zip: '92373',
       },
       email: 'test@test.com',
     },
     deliveryMethod: 'fastest',
   }

   axios.post('/orders.json', order)
     .then(response => {
       this.setState({ loading: false })
     })
     .catch(error => {
       this.setState({ loading: false })
     });
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} type='text' name='name' placeholder='Name' />
        <input className={classes.Input} otype='email' name='email' placeholder='Email' />
        <input className={classes.Input} type='text' name='street' placeholder='Street' />
        <input className={classes.Input} type='text' name='postal' placeholder='PostalCode' />
        <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading === true) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data.</h4>
        {form}
      </div>
    );
  }

};

export default ContactData;
