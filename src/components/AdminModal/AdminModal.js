import React, { useEffect } from 'react';
import * as validation from '../../containers/Comics/validations'
import { comicActions } from '../../services/comics/comicSlice'
import { Button, Input, InputNumber, Modal, Row, Form, message } from 'antd'
import { useDispatch, useSelector } from "react-redux"

export const AdminModal = ({ comic, visible, setVisible, title }) => {

    const [form] = Form.useForm()

    const { comics, reviewComics } = useSelector(state => state.comics)

    const dispatch = useDispatch()

    useEffect(() => {
        form.setFieldsValue(comic)
    }, [])

    const onFinish = (values) => {
        if (comic) {
            const reviewComics = comics.reviewComics.map(c => (c.id === comic.id ? values : c))
            dispatch(comicActions.setComics({ ...comics, reviewComics }))
        } else {
            dispatch(comicActions.addComic(values))
            message.success('Comic agregado')
        }
        setVisible(false)
    }
    const footerModal = [
        <Button key="back" htmlType="submit" form="comic">
            Cancelar
        </Button>,
        <Button key="save" type="primary" htmlType="submit" form="comic">
            Guardar
        </Button>
    ]

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={() => setVisible(false)}
            footer={footerModal}
        >
            <Form
                name="comic"
                onFinish={onFinish}
                validateMessages={validation.messages}
                form={form}
            >
                <Form.Item
                    name="title"
                    label="Título"
                    rules={validation.schema.title}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="id" label="Id" rules={validation.schema.id}>
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Descripción"
                    rules={validation.schema.description}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={["thumbnail", "path"]}
                    label="Path"
                    rules={validation.schema.path}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={["thumbnail", "extension"]}
                    label="Extensión"
                    rules={validation.schema.extension}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}