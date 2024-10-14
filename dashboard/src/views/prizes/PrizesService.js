
    
import api from '../../utils/api';

class PrizesService {
    createPrize(data) {
        return api
            .post("/prize", data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
            .then(response => {
                return response.data.data;
            });
    }

    updatePrize(data, id) {
        return api
            .patch("/prize/" + id, data,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
            .then(response => {
                return response.data.data;
            });
    }

    searchPrize({page, limit,searchText=null,sort=null,order}) {
        let url = `/prize?page=${page}&limit=${limit}`
        if(sort){
    const sortValue = order == 'ascend' ? sort : order == 'descend' ? '-'+sort:'';
            url = url + `&sort=${sortValue}`
        }

        if(searchText){
           
            url = url + `&searchText=${searchText}`
        }

        return api
            .get(url)
            .then(response => {
                return {data:response.data.data,total:response.data.total};
            });
    }

    getPrize(id) {
        return api
            .get("/prize/" + id)
            .then(response => {
                return response.data.data;
            });
    }


    deletePrize( id) {
        return api
            .delete("/prize/" + id)
            .then(response => {
                return response.data.data;
            });
    }

    prizesDo({method,payload}){
        return api
            .post("/prize/do",{method,payload})
            .then(response => {
                return response.data.data;
            });
    }

    prizeDo({method,payload,id}){
        return api
            .post("/prize/do/"+id,{method,payload})
            .then(response => {
                return response.data.data;
            });
    }
}

export default new PrizesService();

    