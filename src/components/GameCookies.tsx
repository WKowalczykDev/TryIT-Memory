import React, { useEffect, useState } from "react";
//możliwe, że trzeba będzie zainstalować paczkę js-cookie npm install js-cookie i później ją zaimportować dla typescripta npm i --save-dev @types/js-cookie
import Cookies from "js-cookie";

interface GameCookiesProps {
  gameWonCount: number; // funkcja wywoływana po zakończeniu gry
  newGameDetector: boolean;
}

const GameCookies: React.FC<GameCookiesProps> = ({ gameWonCount,newGameDetector }) => {
  const [myGameCount, setMyGameCount] = useState<number>(0);
  const [uploadCookiesState, setUploadCookiesState] = useState<boolean>(false);
  // const [username, setUsername] = useState<string>("");
  // useEffect(() => {
  //   // Odczyt z cookies przy starcie komponentu
  //   const savedUsername = Cookies.get("username");
  //   if (savedUsername) setUsername(savedUsername);
  // }, []);
  
  // po wykryciu każdego kolejnego momentu jak gra została wygrana można wyświetlić
  useEffect(() => {
    if(gameWonCount>0){
      console.log(`GAME WON DETECTED ${gameWonCount}`);
      setMyGameCount(gameWonCount);
      setUploadCookiesState(true);
    }
    
  },[gameWonCount]);
  
  //detekcja nowej gry
  useEffect(() => {
    console.log(newGameDetector,myGameCount,gameWonCount);
    
    if(newGameDetector && myGameCount === gameWonCount && gameWonCount>0){
      console.log("GAME RELOAD DETECTED");
      setUploadCookiesState(false);
      
    }

  },[newGameDetector]);
  // const handleSave = () => {
  //   Cookies.set("username", username, { expires: 7 }); // zapis na 7 dni
  //   alert("Zapisano w cookies!");
  // };



  return (
    <div className='game-scores'>

      <p>tutaj będą zapisywane wyniki za pomocą plików cookies (dla chętnych)</p>
    </div>
  );
};

export default GameCookies;
