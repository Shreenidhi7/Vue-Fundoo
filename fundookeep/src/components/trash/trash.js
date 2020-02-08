import noteDisplay from "../noteDisplay";
import { getNotes } from "../../services/userServices";

export default {
  name: "trash",
  components: { noteDisplay },
  props: [],
  data() {
    return {
      trashCard: [],
      trash: "trash"
    };
  },
  computed: {},
  mounted() {
    this.getTrashCards();
  },
  methods: {
    getTrashCards() {
      getNotes().then(res => {
        console.log("results regarding trashed notes in trash.js", res);

        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].trash) {
            console.log("Entered");
            this.trashCard.push(res.data[index]);
          }
          this.trashCard = this.trashCard.slice().reverse();
        }
      });
    }
  }
};
