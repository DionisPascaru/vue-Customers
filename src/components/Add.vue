<template>
  <div class="add container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Add customer</h1>
    <form v-on:submit="addCustomer">
        <div class="well">
            <h4>Customer Info</h4>
            <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" placeholder="first-name" v-model="customer.firstname">
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" placeholder="last-name" v-model="customer.lastname">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" placeholder="email" v-model="customer.email">
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>

import Alert from './Alert'
import firebase from 'firebase';
const db = firebase.firestore();
const dbRef = db.collection("customers");

export default {
  name: 'add',
  data () {
    return {
      customer: {},
      alert: '',
    }
  },
  methods: {
    addCustomer(e){
         
      if(!this.customer.firstname || !this.customer.lastname || !this.customer.email){
        this.alert = 'Please fill in all required fields';
      } else {
        dbRef.add({ 
          firstname: this.customer.firstname,
          lastname: this.customer.lastname,
          email: this.customer.email
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
       
        this.$router.push({path: "/", query: {alert: "Customer Added"}});
      }
      e.preventDefault();
    }
  },
  components: {
    Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
