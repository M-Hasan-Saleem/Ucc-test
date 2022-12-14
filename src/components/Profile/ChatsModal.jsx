import { useEffect, useState } from "react";
import "./Profile.css"
import { baseUrl, domain } from "../../utils/baseUrl";
import axios from 'axios';

export default function ChatsModal(props) {

    const [Chats, setChats] = useState({})
    const [ChatWithName, setChatWithName] = useState('')

    const closeTheChatsModal = () => {
        document.getElementById("theChats").classList.remove("show");
    }

    useEffect(() => {
        console.log(props.chat);
        setChats(props.chat)
        setChatWithName(props.chatWithName)
    }, [props])
    

  return (
    <>
        <div className="modal fade" id="theChats" tabIndex="-1" aria-labelledby="addNewCardTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-transparent">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{closeTheChatsModal()}}></button>
                    </div>
                    <div class="card-header lessArea">
                        <h4 class="card-title">Chat with&nbsp;<span>{` ${ChatWithName}`}</span></h4>
                    </div>
                    <div>
                        <ul className="chat-list">
                            <li>{`${Chats}`}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
