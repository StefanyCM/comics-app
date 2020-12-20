import React, { Fragment, useState } from 'react';
import { Button, Divider } from 'antd';
import './ComicCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { comicActions } from '../../services/comics/comicSlice';
import { AdminModal } from '../AdminModal/AdminModal';

/**
 * NEW
 * REVIEW
 * APPROVED
 */

const ComicCard = ({ comic, onSelect }) => {

  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const { title, id, description, thumbnail, state } = comic

  const { comics } = useSelector(state => state.comics)

  const dispatch = useDispatch()

  let message = 'A revisar';
  let buttonType = 'default';

  switch (comic.state) {
    case 'REVIEW':
      buttonType = 'primary';
      message = 'Añadir a lista';
      break;
    case 'APPROVED':
      message = 'Volver';
      buttonType = 'ghost';
      break;
    default:
      message = 'Seleccionar';
      buttonType = 'text';
      break;
  }

  const  deleteComic = () => {
    dispatch(comicActions.setComics({
      ...comics,
      reviewComics: comics.reviewComics.filter(i => i.id !== comic.id),
    }))
  }

  const onClick = () => {
    let newState
    switch (comic.state) {
      case 'NEW':
        comic.state = 'REVIEW';
        newState = {
          ...comics,
          newComics: comics.newComics.filter(i => i.id !== comic.id),
          reviewComics: [...comics.reviewComics, comic]
        }
        dispatch(comicActions.setComics(newState))
        break;
      case 'REVIEW':
        comic.state = 'APPROVED';
        newState = {
          ...comics,
          reviewComics: comics.reviewComics.filter(i => i.id !== comic.id),
          approvedComics: [...comics.approvedComics, comic]
        }
        dispatch(comicActions.setComics(newState))
        break;
      case 'APPROVED':
        comic.state = 'REVIEW';
        newState = {
          ...comics,
          approvedComics: comics.approvedComics.filter(i => i.id !== comic.id),
          reviewComics: [comic, ...comics.reviewComics]
        }
        dispatch(comicActions.setComics(newState))
        break;
      default:
        comic.state = '';
        break;
    }
  }

  const image = `${thumbnail?.path}.${thumbnail?.extension}`;

  return (
    <div className='comic-card-container'>
      <div className='image'>
        <img
          src={image || 'https://e.rpp-noticias.io/xlarge/2020/04/26/182718_933313.jpg'}
          alt='Comic Marvel'
          width='200px'
        />
      </div>
      <div className='left-content'>
        <div>
          <label className='label'>Título: {title}</label>
        </div>
        {/* <div>
          <label className='label'>Id:</label>
        </div> */}
        {description &&
          <div>
            <label className='label'>Descripción:</label>
            <p className='label'>{description}</p>
          </div>
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button type={buttonType} onClick={onClick}>
          {message}
        </Button>
        <Divider />
        {state == 'REVIEW' && (
          <Fragment>
            <Button type={buttonType} onClick={() => setUpdateModalVisible(true)}>
              Editar
            </Button>
            <Button type="default" onClick={() => deleteComic()}>
              Eliminar
            </Button>
          </Fragment>
        )}
      </div>
      <AdminModal
        title="Actualizar comic"
        visible={updateModalVisible}
        setVisible={setUpdateModalVisible}
        comic={comic}
      />

    </div>
  );
}

export default ComicCard;