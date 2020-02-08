import noteDisplay from "../noteDisplay";

import { getNotes } from "../../services/userServices";

export default {
  name: "archive",
  components: { noteDisplay },
  props: [],
  data() {
    return {
      archivedCard: [],
      more: "archive"
    };
  },
  computed: {},
  mounted() {
    this.getArchivedCards();
  },
  methods: {
    getArchivedCards() {
      getNotes()
        .then(res => {
          for (let index = 0; index < res.data.length; index++) {
            if (res.data[index].archive) {
              console.log("Entered");
              this.archivedCard.push(res.data[index]);
            }
            this.archivedCard = this.archivedCard.slice().reverse();
          }
        })
        .catch(error => {
          console.log("error while getting cards(  @archive  )", error);
        });
    }
  }
};
