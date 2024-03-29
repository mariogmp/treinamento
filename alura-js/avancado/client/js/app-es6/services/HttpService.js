export class HttpService{

    // Utilizando Fetch API
    get(url){

        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json())
        
    }

    post(url){
        return fetch(url, {
            headers: {'Content-type' : 'application/json'},
            method: 'post',
            body: JSON.stringify(dado)
        })
    }

    _handleErrors(res){

        if (!res.ok) throw new Error(res.statusText);
        return res;
    }

    /**
    get(url){
        
        return new Promise((resolve, reject) => {
 
            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);    
            xhr.onreadystatechange = () => {
    
                if (xhr.readyState == 4){
                    if (xhr.status == 200){
                        // Quando o método for bem sucessido, esse retorno irá ser chamado no método "then" do promise
                        resolve(JSON.parse(xhr.responseText));    
                    }else{
                        // Quando o método for não for bem sucessido, esse retorno irá ser chamado no método "catch" do promise
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send();                                
        })
    }
    */
}