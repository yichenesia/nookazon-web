import axios from 'axios';

const rootURL = "http://localhost:5000/"

export class Services {
    getproductlist (callback) {
        axios.get(rootURL + "productlist").then(function (response) {
            callback({"status": "ok", "productlist": response.data})
        }
        ).catch(function (error) {
            return {"status": "failed", "error": error}
        })
    };

    saveuserorder (userOrder, callback) {
        axios.post(rootURL + "saveuserorder", userOrder).then(function (response) {
            callback({"status": "ok"})
        }
        ).catch(function (error) {
            return {"status": "failed", "error": error}
        })

    };

}
