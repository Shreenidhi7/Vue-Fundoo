import noteService from "../../services/noteServices";

import router from "../../router";

import { serverBus } from "../../main";

export default {
  name: "dashboard",
  props: ["server"],
  components: {},
  data() {
    return {
      form: {
        label: null
      },
      labelArray: [],
      showLabelDialog: false,
      reverseinputfield: false,
      addLabelIcon: false,

      profilepicDialog: false,

      userFirstName: "",
      userLastName: "",
      userEmail: "",

      selectedEmployee: null,
      employees: ["abc", "bac", "asd"],
      backgroundColor: false,
      color: "",
      url: String,
      ListOn: true,
      menuVisible: true,
      selectedNotes: null,
      notes: ["abc", "asc", "asds"]
    };
  },
  computed: {},
  mounted() {
    this.userFirstName = localStorage.getItem("userFirstName");
    this.userLastName = localStorage.getItem("userLastName");
    this.userEmail = localStorage.getItem("userEmail");

    console.log("In mounted dashboard");
    console.log("userFirstName", this.userFirstName);
    console.log("userLastName", this.userLastName);
    console.log("userEmail", this.userEmail);
  },

  methods: {
    // showlabelDialog() {
    //   this.showLabelDialog = !this.showLabelDialog;
    // },

    changeToaddLabelIcon() {
      this.addLabelIcon = !this.addLabelIcon;
    },

    reverseField(label) {
      console.log(label, "reverseField (label)");

      this.reverseinputfield = !this.reverseinputfield;
    },

    showProfileDialog() {
      this.profilepicDialog = !this.profilepicDialog;
    },

    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },

    listToggle() {
      // this.ListOn = !this.ListOn;
      this.travelList(this.ListOn);
    },

    // travelList(ListOn) {
    //   console.log("emitting List Property", ListOn);
    //   // this.$parent.$emit("listOn", ListOn);
    //   this.$emit("listOn", ListOn);
    //   console.log("the value of listOn after emitting", ListOn);
    // },

    travelList(ListOn) {
      console.log("emitting List Property(before emiting)", ListOn);
      // // this.$parent.$emit("listOn", ListOn);
      // this.$emit("listOn", ListOn);
      // console.log("the value of listOn after emitting", ListOn);

      serverBus.$emit("listOn", ListOn);
      this.ListOn = !this.ListOn;
      // console.log(
      //   "the value of listOn after emitting(through server bus)",
      //   ListOn
      // );
    },

    changeBackground() {
      if ((this.backgroundColor = !this.backgroundColor)) {
        this.color = "#000000";
      }
    },

    /**************************************************************** */

    /**
     * CREATE LABEL
     */

    // CreateLabel()

    CreateLabel() {
      console.log("IN CREATE LABEL MTD");

      var userId = localStorage.getItem("userId");
      console.log("userId from local", userId);

      var data = {
        userId: userId,
        label: this.form.label
      };
      console.log("createLabel Data", data);

      noteService
        .createLabel(data)
        .then(res => {
          this.labelArray.push(res.data);
          this.form.label = null;
        })
        .catch(err => {
          console.log("error while creating label ", err);
        });
    },

    // wrong() {
    //   this.form.label = null;
    // },

    Cancel() {
      this.form.label = null;
    },

    /**************************************************************** */

    /**
     * DELETE LABEL
     */

    deletelabel(label) {
      console.log("IN DELETE LABEL MTD");

      var key = this.labelArray.indexOf(label);
      this.labelArray.splice(key, 1);
      var data = {
        labelID: [label._id]
      };
      console.log("to delete label", data);

      noteService
        .deleteLabel(data)
        .then(res => {
          console.log(res, "Delete label data");
        })
        .catch(err => {
          console.log("err while deleting label", err);
        });
    },

    reversflag(label) {
      console.log(label);

      this.flag = !this.flag;
    },

    /**************************************************************** */

    /**
     * EDIT LABEL
     */

    editLabel(label) {
      console.log("IN EDIT LABEL");

      var data = {
        labelID: label._id,
        label: label.label
      };
      console.log("to edit label", data);

      noteService
        .editLabel(data)
        .then(res => {
          console.log("edited label", res);
        })
        .catch(err => {
          console.log("error while editing ", err);
        });
    },

    /**************************************************************** */

    logoutUser() {
      localStorage.clear();
      router.push("/login");
    }

    /**************************************************************** */

    // processFile(e) {
    //   const filedata = new FormData();
    //   filedata.append("image", e.target.files[0]);
    //   noteService.setprofilepic(filedata).then(res => {
    //     this.image = res.data;
    //     localStorage.setItem("image", res.data);
    //   });
    // }

    /**************************************************************** */
  }
};
