import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

const baseUrl = "http://localhost:58863/vaccines/"

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        allVaccines: [],
        idForSpecific: 0,
        specificVaccine: {},
        newVaccProducer: "",
        newVaccPrice: 0,
        newVaccEffi: 50,
        idToDelete: 0,
        bestVaccines: []
    },
    methods: {
        //async/await den skal afvente der hvor vi skriver await - asynkront fra resten a programmet 
        //dvs. resten af programmet kan køre videre før der kommer svar
        async GetVaccines() {

            try {
                let response = await axios.get(baseUrl);

                this.allVaccines = response.data;

            } catch (error) {
                alert("something went wrong");
            }

        },
        async GetSpecificVaccine() {

            try {

                //laver vi kaldet til vores api med den bindende id fra input feltet
                let response = await axios.get(baseUrl + `${this.idForSpecific}`);
                //der sætter vi specifik vaccine til at være = responsets data så det kan blive vist
                this.specificVaccine = response.data;


            } catch (error) {
                //fortæller vi brugeren at der ikke blev fundet nogen vaccine
                alert("No Vaccine Found");
                //her der nustiller vi specific vaccine - det gør vi fordi man godt kan have søgt og fejle nr 2 gang
                this.specificVaccine = {};
            }

        },
        async CreateNewVaccine() {


            //det er den data der skal sendes med for at oprette et nyt vaccine objekt --
            //-- dvs vores api skal modtage et vaccine object som json
            let postBody = {
                //id'et bliver genereret af vores api
                'id': 0,
                //de data sæt som vi binded til inputtet ude i html'en/viewet
                'producer': this.newVaccProducer,
                'price': this.newVaccPrice,
                'efficiency': this.newVaccEffi
            }



            try {

                //vi sender/poster vores gemte til vores base url. hvor vores post metode skal modtage et json object som er en vaccine
                let response = await axios.post(baseUrl, postBody);

                //vi gemmer det id vi får tilbage i en variable
                let idOfNewVaccine = response.data;


            } catch (error) {

                alert("new vaccine not created")
            }


        },
        async DeleteVaccine() {

            //sender id fra inputtet med til delete metoden i vores api
            let response = await axios.delete(baseUrl + `${this.idToDelete}`);

            //vi gemmer om det lykkes i en variable
            let succes = response.data;
            // hvis det lykkes siger vi "vaccine deleted" ellers "vaccine not found"
            if (succes) {

                alert("Vaccine was deleted");

            } else {

                alert("vaccine not found");
            }
        },
        async GetBestVaccines() {
            try {
                let response = await axios.get(baseUrl + "best");

                this.bestVaccines = response.data;

            } catch (error) {
                alert("something went wrong");
            }
        }

    }
})