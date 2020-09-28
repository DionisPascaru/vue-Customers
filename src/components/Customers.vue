<template>
  <div class="customers container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Welcome to Manage Customers</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" v-bind:key="customer['.key']">
          <td>{{ customer.firstname}}</td>
          <td>{{ customer.lastname}}</td>
          <td>{{ customer.email}}</td>
          <td><router-link class="btn btn-default" v-bind:to="'/customer/' + customer.id">View</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import Alert from './Alert'
import firebase from 'firebase';
const db = firebase.firestore();
const dbRef = db.collection("customers");


export default {
  name: 'customers',
  data () {
    return {
      customers: [],
      customerID: '',
      alert: ''
    }
  },
  methods: {
    fetchCustomers(){
      dbRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
          this.customers.push({
              id: doc.id,
              firstname: doc.data().firstname,
              lastname: doc.data().lastname,
              email: doc.data().email
            });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });     
    },
  },

  created(){
    if(this.$route.query.alert){
      this.alert = this.$route.query.alert;
    }
    this.fetchCustomers();
  },
  components: {
    Alert
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
