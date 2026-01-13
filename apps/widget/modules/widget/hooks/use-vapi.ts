import Vapi from "@vapi-ai/web";

import { useEffect, useState } from "react";

interface TranscriptMessage {
    role: "user" | "assistant";
    text: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

  useEffect(() => {
    //only for testing the vapi Api
    const vapiInstance = new Vapi("d3370ba0-6e3a-4ae3-b1ba-d4b8d4c11fad");
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
        setIsConnecting(true);
        setIsConnected(false);
        setTranscript([]);
    });
     vapiInstance.on("call-end", () => {
        setIsConnecting(false);
        setIsConnected(false);
        setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
        setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
        setIsSpeaking(false);
    });

    vapiInstance.on("error", (error) => {
        console.error("Vapi Error:", error);
        setIsConnecting(false);
       
    });

    vapiInstance.on("message", (message) => {
        if(message.type === "transcript" && message.transcriptType === "final") {
            setTranscript((prev) => [...prev, { role: message.role === "user" ? "user" : "assistant", text: message.transcript }]);
        }
    });

    return () => {
        vapiInstance?.stop();
    }
  }, []);

  const startCall = () => {
    setIsConnecting(true);
    if(vapi){
        vapi.start("83869a50-9194-46f5-928b-905caa98e09d");
    }
  }

  const endCall = () => {
    if(vapi){
        vapi.stop();
    }
  };

  return {
    isSpeaking,
    isConnected,
    isConnecting,
    transcript,
    startCall,
    endCall
  }
}