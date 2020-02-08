import { validationMixin } from "vuelidate";

import { login } from "../../services/userServices";

// import service from "../../services/userServices";

import router from "../../router";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "login",
  mixins: [validationMixin],
  components: {},
  props: [],
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      sending: false,
      errormsg: "",
      showSnackbar: false,
      position: "left",
      duration: 2500,
      isInfinity: false
    };
  },

  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(3)
      }
    }
  },

  computed: {},
  mounted() {},
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },

    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },

    saveUser() {
      var loginCred = {
        email: this.form.email,
        password: this.form.password
      };
      console.log("in js file", loginCred);

      login(loginCred)
        .then(result => {
          console.log("login info(LocalStorage Happens here)", result);

          if (result.status == 200) {
            console.log("in 200");

            // var token = result.token.token;
            // var userId = result._id;

            /*****************
             * login details to local Storage
             * token
             * userId
             */

            var token = result.data.response.token.token;
            var userId = result.data.response._id;

            // console.log("token", token);
            // console.log("userId", userId);

            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);

            /******************************************* */

            /*****************
             * login details to local Storage
             * firstName,lastName
             * email
             */

            var firstName = result.data.result[0].firstName;
            var lastName = result.data.result[0].lastName;
            var email = result.data.result[0].email;

            // console.log("firstName", firstName);
            // console.log("lastName", lastName);
            // console.log("email", email);

            localStorage.setItem("userFirstName", firstName);
            localStorage.setItem("userLastName", lastName);
            localStorage.setItem("userEmail", email);

            /******************************************* */

            router.push("/dashboard");
            this.sending = true;
          } else if (result.status == 240) {
            console.log("In 240");
            // var errormsg = result.data.message;
            this.errormsg = result.data.message;
            console.log("!!!!!!!!!!!!!!!", this.errormsg);

            this.showSnackbar = !this.showSnackbar;
            console.log("after error msg", this.showSnackbar);
          } else {
            console.log("in else");
          }
        })
        .catch(error => {
          console.log("Faild to login", error);
        });
    },

    register() {
      router.push("/signup");
    }
  }
};
