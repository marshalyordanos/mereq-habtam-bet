
    
import api from '../../utils/api';

class PuzzlesService {
    createPuzzle(data) {
        return api
            .post("/puzzle", data)
            .then(response => {
                return response.data.data;
            });
    }

    updatePuzzle(data, id) {
        return api
            .patch("/puzzle/" + id, data)
            .then(response => {
                return response.data.data;
            });
    }

    searchPuzzle({page, limit,searchText=null,sort=null,order}) {
        let url = `/puzzle?page=${page}&limit=${limit}`
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

    getPuzzle(id) {
        return api
            .get("/puzzle/" + id)
            .then(response => {
                return response.data.data;
            });
    }


    deletePuzzle( id) {
        return api
            .delete("/puzzle/" + id)
            .then(response => {
                return response.data.data;
            });
    }

    puzzlesDo({method,payload}){
        return api
            .post("/puzzles/do",{method,payload})
            .then(response => {
                return response.data.data;
            });
    }

    puzzleDo({method,payload,id}){
        return api
            .post("/puzzles/do/"+id,{method,payload})
            .then(response => {
                return response.data.data;
            });
    }
}

export default new PuzzlesService();

    