import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength
  // maxLength
} from "vuelidate/lib/validators";

import { register } from "../../services/userServices";
// import service from "../../services/userServices";

import router from "../../router";
export default {
  name: "register",
  mixins: [validationMixin],
  components: {},
  props: [],

  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      email: null,
      password: null
    },
    // loading: false,
    // userSaved: false,
    sending: false
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },

      lastName: {
        required,
        minLength: minLength(3)
      },
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
        // this.loading = true;
        this.saveUser();
      }
    },

    clearForm() {
      this.$v.reset();
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.email = null;
      this.form.password = null;
    },

    saveUser() {
      var createAccount = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        password: this.form.password
      };

      // this.sending = true;

      register(createAccount)
        .then(result => {
          console.log("res from backend", result);

          var successMsg = result.message;

          // var userFname = result.result.firstName;
          // var userLname = result.result.lastName;
          // var userEmail = result.result.email;

          var reg = "User registered sucessfully";

          if (successMsg === reg) {
            this.sending = true;

            // var userFname = result.result.firstName;
            // var userLname = result.result.lastName;
            // var userEmail = result.result.email;

            // console.log("In signup");
            // console.log("userFname", userFname);
            // console.log("userLname", userLname);
            // console.log("userEmail", userEmail);

            // localStorage.setItem("userFirstName", userFname);
            // localStorage.setItem("userLastName", userLname);
            // localStorage.setItem("userEmail", userEmail);

            router.push("/login");
            // this.userSaved = true;

            // this.loading = false;
            this.clearForm();
          } else {
            alert("Failed to Register");
          }
        })
        .catch(error => {
          console.log("Faild to register", error);
          // alert("Failed to Register");

          // this.loading = false;
          // this.userSaved = false;
          this.sending = false;
        });
    },

    login() {
      router.push("/login");
    }
  }
};
