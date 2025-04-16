import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import ModelSelect from './ModelSelect';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onNewChat: () => void;
  loading: boolean;
  showNewChatButton: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onNewChat, 
  loading,
  showNewChatButton
}) => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState("azure");
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <Grow in timeout={500}>
      <Paper elevation={4} sx={{ width: '100%', maxWidth: 700, p: 2, borderRadius: 4, background: '#f8fafd', boxShadow: '0 4px 24px 0 rgba(60,60,100,0.10)' }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" alignItems="center" gap={2}>
            {showNewChatButton && (
              <IconButton 
                color="primary"
                onClick={onNewChat}
                disabled={loading}
                size="small"
                sx={{ 
                  p: '8px', 
                  border: '1px solid rgba(0,122,255,0.3)', 
                  borderRadius: '50%',
                  '&:hover': { 
                    bgcolor: 'rgba(0,122,255,0.1)' 
                  }
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            )}
            <TextField
              inputRef={inputRef}
              fullWidth
              size="medium"
              variant="outlined"
              placeholder="What do you want to know?"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
              sx={{ background: '#fff', borderRadius: 2, transition: 'box-shadow 0.3s', boxShadow: '0 1px 4px 0 rgba(60,60,100,0.04)' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ModelSelect value={model} onChange={setModel} disabled={loading} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!input.trim() || loading}
              sx={{ minWidth: 48, minHeight: 48, borderRadius: '50%', boxShadow: '0 2px 8px 0 rgba(0,122,255,0.10)', transition: 'background 0.2s' }}
            >
              <SendIcon />
            </Button>
          </Box>
        </form>
        
        <Box className="terms-text" mt={2} textAlign="center" color="#999" fontSize={13}>
          By messaging bitChat, you agree to our Terms and Privacy Policy.
        </Box>
      </Paper>
    </Grow>
  );
};

export default ChatInput;