<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Edit</h1>
     <form v-on:submit="updateCustomer">
        <div class="well">
            <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" v-model="newCustomer.firstname" >
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" v-model="newCustomer.lastname" >
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" v-model="newCustomer.email" >
            </div>
        </div>
        <button type="submit" class="btn btn-primary" >Submit</button>
    </form>
  </div>
</template>
<script>

import Alert from './Alert'
import firebase from 'firebase';
const db = firebase.firestore();
const dbRef = db.collection("customers");

export default {
  name: 'edit',
  data () {
    return {
      newCustomer: {},
      alert: '',
    }
  },
  methods: {
    fetchCustomers(id){
      dbRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.id == id){
            this.newCustomer = doc.data();
          }
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    },
    updateCustomer(e){
      dbRef.doc(this.$route.params.id)
      .update(this.newCustomer)
      .then(() => {
         this.$router.push({path: "/customer/" + this.$route.params.id, query: {alert: "Document successfully updated!"}});
      })
       e.preventDefault();
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

</style>
