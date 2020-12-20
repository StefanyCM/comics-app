import React, { useState, useEffect } from 'react';
import { ColumnCard } from '../../components';
import { Api } from '../../common/api';
import './ManageComics.css';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { comicActions } from '../../services/comics/comicSlice'
import { Button } from 'antd';
import { AdminModal } from '../../components/AdminModal/AdminModal';

const ManageComics = () => {

  const [createModalVisible, setCreateModalVisible] = useState(false)
  /* const [comics, setComics] = useState({
    newComics: [], reviewComics: [], approvedComics: []
  }); */

  const dispatch = useDispatch()

  const { newComics, comics, loading, comicSelected } = useSelector((state) => state.comics)

  console.log(newComics)

  const handleSelect = comic => {
    /* switch (comic.state) {
      case 'NEW':
        comic.state = 'REVIEW';
        setComics({
          ...comics,
          newComics: comics.newComics.filter(i => i.id !== comic.id),
          reviewComics: [...comics.reviewComics, comic]
        });
        break;
      case 'REVIEW':
        comic.state = 'APPROVED';
        setComics({
          ...comics,
          reviewComics: comics.reviewComics.filter(i => i.id !== comic.id),
          approvedComics: [...comics.approvedComics, comic]
        });
        break;
      case 'APPROVED':
        comic.state = 'REVIEW';
        setComics({
          ...comics,
          approvedComics: comics.approvedComics.filter(i => i.id !== comic.id),
          reviewComics: [comic, ...comics.reviewComics]
        });
        break;
      default:
        comic.state = '';
        break;
    } */
  }

  const assignState = (otherComics, state) => (
    otherComics.map(i => ({ ...i, state }))
  );

  return (
    <div>
      <Button type="primary" onClick={() => setCreateModalVisible(true)}>Agregar comic</Button>
      <div className='manage-container'>
        <ColumnCard
          comics={assignState(comics.newComics, 'NEW')}
          onSelect={handleSelect}
          title='NUEVOS COMICS'
        />
        <ColumnCard
          comics={assignState(comics.reviewComics, 'REVIEW')}
          onSelect={handleSelect}
          title='EN REVISIÓN'
        />
        <ColumnCard
          comics={assignState(comics.approvedComics, 'APPROVED')}
          onSelect={handleSelect}
          title='APROBADOS'
        />
      </div>
      <AdminModal
        visible={createModalVisible}
        setVisible={setCreateModalVisible}
        title="Crear Comic"
      />
    </div>
  );
}

export default ManageComics;