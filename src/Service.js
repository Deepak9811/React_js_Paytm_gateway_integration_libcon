import {API_URL} from './Constant';

export const generateToken = async (orderId, amount,email,phone) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  console.log(amount)

  var raw = JSON.stringify({
    orderId: orderId,
    amount: amount,
    email: email,
    phone:phone
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return await fetch(API_URL, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log("result",result)
      return result?.hiddenInput?.txnToken;
    })
    .catch(error => console.log('error :- ', error));
};