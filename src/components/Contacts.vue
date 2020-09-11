<template>
    <form action="">
        <div class="contacts">
            <input type="text" placeholder="first name">
            <input type="text" placeholder="last name">
            <input type="email" placeholder="email">
            <textarea id="" cols="30" rows="10" placeholder="message"></textarea>
        </div>
    </form>
</template>

<script>
export default {
    name: "contacts",
    data () {
        return {
            customerInfo: []
        }
    }
}
</script>