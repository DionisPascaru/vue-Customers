<template>
  <div class="customer-details container">
    <h1 class="page-header">Details</h1>
    <div class="customer">
      <button class="btn btn-default" v-on:click="deleteCustomer()">Delete</button>
      <ul class="list-group">
        <li class="list-group-item">
          <p>First Name: {{customer.firstname}}</p>
          <button class="btn btn-default">Edit</button>
        </li>
        <li class="list-group-item">
          <p>Last Name: {{customer.lastname}}</p>
          <button class="btn btn-default">e</button>
        </li>
        <li class="list-group-item">
          <p>Email: {{customer.email}}</p>
          <button class="btn btn-default">e</button>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>

import firebase from 'firebase';
const db = firebase.firestore();

export default {
  name: 'customer-details',
  data () {
    return {
      customer: {},
      alert: ''
    }
  },
  methods: {
    fetchCustomers(id){
     
      db.collection("customers").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.id == id){
            this.customer = doc.data();
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
        db.collection("customers").doc(this.$route.params.id).delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.log('Error deleting user:', error);
        });
        this.$router.push({path: "/", query: {alert: "Successfully deleted user"}});
      }
    }
  },
  created(){
    this.fetchCustomers(this.$route.params.id)
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
