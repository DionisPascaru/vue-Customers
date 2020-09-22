<template>
  <div class="customer-details container">
     <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Details</h1>
    <div class="customer">
      <button class="btn btn-default" v-on:click="deleteCustomer()">Delete</button>
      <router-link class="btn btn-default" v-bind:to="'/customer/' + customerID + '/edit'">Edit</router-link>
      <ul class="list-group">
        <li class="list-group-item">
          <p><strong>First Name: </strong>{{customer.firstname}}</p>
        </li>
        <li class="list-group-item">
          <p><strong>Last Name: </strong> {{customer.lastname}}</p>
        </li>
        <li class="list-group-item">
          <p><strong>Email: </strong>{{customer.email}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>

import Alert from './Alert'
import firebase from 'firebase';
const db = firebase.firestore();
const dbRef = db.collection("customers");

export default {
  name: 'customer-details',
  data () {
    return {
      customer: {},
      customerID: '',
      alert: ''
    }
  },
  methods: {
    fetchCustomers(id){
      dbRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.id == id){
            this.customer = doc.data();
            this.customerID = doc.id;
            console.log("this.customer", this.customer)
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });     
    },
    deleteCustomer(){
      let confirmDelete = confirm("delete this item?")
      if(confirmDelete == true){
        dbRef.doc(this.$route.params.id).delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.log('Error deleting user:', error);
        });
        this.$router.push({path: "/", query: {alert: "Successfully deleted user "}});
      }
    }
  },
  created(){
    this.fetchCustomers(this.$route.params.id)
  },
  components: {
    Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list-group-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
</style>
