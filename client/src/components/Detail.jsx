import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// import styles from "../css/Detail.css";
import * as actions from '../redux/actions/actions';
import Swal from 'sweetalert2';

export default function Detail() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const [product, setProduct] = useState(null);
	const { id } = useParams();
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(`/products/${id}`);
				setProduct(response.data);
			} catch (error) {
				console.log('Error fetching product:', error);
			}
		};

		fetchProduct();
	}, [id]);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (id) => {
		try {
			dispatch(actions.setCart(id));
			Swal.fire({
				text: 'Se ha agregado el producto',
				icon: 'success',
				timer: 1100,
			});
		} catch (error) {
			Swal.fire({
				text: 'Error al agregar el producto',
				icon: 'warning',
				timer: 2000,
			});
			throw error;
		}
	};

	return (
		<main className='grid justify-center items-center mt-20 mb-40 mx-10 grid-cols-2 gap-4'>
			<div className='grid justify-center items-center'>
				<div className='max-w-[600px] max-h-[600px] flex justify-center items-center'>
					<div className='w-full h-full'>
						<img
							src={product?.image}
							alt='Imagen del producto'
							className='object-cover'
						/>
					</div>
				</div>
			</div>

			<div>
				{product ? (
					<article className='bg-gray-100 drop-shadow-lg rounded p-6'>
						<header>
							<h1 className='text-2xl font-bold mb-4'>
								{product.name}
							</h1>
						</header>
						<section className='mb-2'>
							<h2 className='text-lg font-bold'>Precio</h2>
							<p className='text-gray-700 text-xl'>
								${product.price}
							</p>
						</section>
						<section className=' mt-2 mb-2'>
							<h2 className='text-lg font-bold'>Descripción</h2>
							<p className='text-gray-700'>
								{product.description}
							</p>
						</section>
						{product.categories && (
							<section className=' mt-2 mb-2'>
								<h2 className='text-lg font-bold'>Categoría</h2>
								{product.categories.map((category, index) => (
									<p className='text-gray-700' key={index}>
										{category.name}
									</p>
								))}
							</section>
						)}
						{product.platforms && (
							<section className=' mt-2 mb-2'>
								<h2 className='text-lg font-bold'>
									Plataformas
								</h2>
								<div className='pl-10'>
									<ul className='text-gray-700'>
										{product.platforms.map(
											(platform, index) => (
												<li key={index}>{platform}</li>
											),
										)}
									</ul>
								</div>
							</section>
						)}
						{product.licenses && (
							<section className='mt-2 mb-2'>
								<h2 className='text-lg font-bold'>
									Tipo de licencia
								</h2>
								<div className='pl-10'>
									<ul className='text-gray-700'>
										{product.licenses.map(
											(license, index) => (
												<li key={index}>{license}</li>
											),
										)}
									</ul>
								</div>
							</section>
						)}

						<section className=' mt-2 mb-2'>
							<h2 className='text-lg font-bold'>Disponibles</h2>
							<p className='text-gray-700'>{product.quantity}</p>
						</section>
						<div className='p-4'>
							<Link to={'/home'}>
								<button className='mx-4 px-4 py-2 mt-4 text-blue-700 bg-blue-200 hover:bg-blue-600 hover:text-white rounded transition-colors duration-300'>
									Regresar a inicio
								</button>
							</Link>
							<button
								className='px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-300'
								onClick={() => addToCart(product.id)}>
								Agregar al Carrito
							</button>
						</div>
					</article>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</main>
	);
}
