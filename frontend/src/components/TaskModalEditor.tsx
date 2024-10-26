import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Task } from '../types/Task';

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  task: Task;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
};

export const TaskModalEditor: React.FC<TaskModalProps> = ({ open, handleClose, task }) => {
  const [title, setTitle] = useState<string>(task.title);
  const [subtitle, setSubtitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [editedComment, setEditedComment] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement | undefined>(null);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isSubtitleEditing, setIsSubtitleEditing] = useState(false);
  const [isCommentEditing, setIsCommentEditing] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    // updateTask({ ...task, title, subtitle, comment });
    setIsTitleEditing(false);
    setIsSubtitleEditing(false);
    handleClose();
  };

  const saveComment = () => {
    setComment(editedComment);
    // updateTask({ ...task, comment: editedComment });
    setIsCommentEditing(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box display="flex" alignItems="center">
          {isTitleEditing ? (
            <ReactQuill
              value={title}
              onChange={(value) => setTitle(value)}
              theme="snow"
              modules={quillModules}
              style={{ color: 'black', flexGrow: 1 }}
            />
          ) : (
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: 'black' }}
              onClick={() => setIsTitleEditing(true)}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}
          <IconButton onClick={() => setIsTitleEditing(!isTitleEditing)}>
            <EditIcon />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" mt={2}>
          {isSubtitleEditing ? (
            <ReactQuill
              value={subtitle}
              onChange={(value) => setSubtitle(value)}
              theme="snow"
              modules={quillModules}
              style={{ color: 'black', flexGrow: 1 }}
            />
          ) : (
            <Typography
              variant="subtitle1"
              sx={{ flexGrow: 1, color: 'black' }}
              onClick={() => setIsSubtitleEditing(true)}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          )}
          <IconButton onClick={() => setIsSubtitleEditing(!isSubtitleEditing)}>
            <EditIcon />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" mt={2}>
          <Avatar sx={{ width: 56, height: 56, mb: 2 }} alt="Task Avatar">
            A
          </Avatar>
          <Typography sx={{ flexGrow: 1, color: 'black' }}>Создатель задачи</Typography>
        </Box>

        <IconButton
          aria-label="more"
          onClick={handleMenuOpen}
          sx={{ position: 'absolute', top: 16, right: 16 }}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleSave}>Сохранить изменения</MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
            }}>
            Удалить задачу
          </MenuItem>
        </Menu>
        <Button variant="contained" fullWidth onClick={handleSave} sx={{ mt: 2 }}>
          Сохранить
        </Button>
        <Box>
          <Typography sx={{ flexGrow: 1, color: 'black', marginTop: 10 }}>
            Оставьте комментарий:
          </Typography>
          <Typography
            sx={{ flexGrow: 1, color: 'black' }}
            dangerouslySetInnerHTML={{ __html: comment }}
          />
          <ReactQuill
            value={editedComment}
            onChange={(value) => setEditedComment(value)}
            theme="snow"
            modules={quillModules}
            style={{ color: 'black', flexGrow: 1 }}
          />

          <Button onClick={saveComment} variant="outlined" fullWidth sx={{ mt: 2 }}>
            Отправить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
