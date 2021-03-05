import React, { Component } from 'react'
import { searchRestaurants, addFavorite, getFavorites } from '../api-utils.js';

export default class SearchPage extends Component {
    state = {
        restaurants: [],
        favorites: [],
        location: ''
    }

    componentDidMount = async () => {
        if (this.props.token) await this.fetchFavorites();
    }

    fetchFavorites = async () => {
        const favorites = await getFavorites(this.props.user.token);

        this.setState({ favorites })
    }

    doSearch = async () => {
        const restaurants = await searchRestaurants(this.state.location, this.props.user.token);

        this.setState({ restaurants });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await this.doSearch();
    }

    handleFavoriteClick = async (favRestaurant) => {
        await addFavorite({
            yelp_id: favRestaurant.yelp_id,
            name: favRestaurant.name,
            image: favRestaurant.image_url,
            rating: favRestaurant.rating,
        }, this.props.user.token);

        await this.fetchFavorites();
    }

    handleLocationChange = (e) => this.setState({ location: e.target.value })

    isAFavorite = (restaurant) => {
        if (!this.props.user.token) return true;

        const isInFavorites = this.state.favorites.find(favorite => favorite.yelp_id === restaurant.yelp_id)

        return Boolean(isInFavorites)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.location} onChange={this.handleLocationChange} placeholder='Enter Location' />
                    <button>Search for Restaurants</button>
                </form>
                <div className="restaurants">
                    {
                        this.state.restaurants.map((restaurant) =>
                            <div key={`${restaurant.yelp_id}`} className='restaurant'>
                                <img src={restaurant.image_url} alt={restaurant.yelp_id} />
                                <p>Restaurant name:{restaurant.name}</p>
                                <p>Rating:{restaurant.rating}</p>
                                <p>{this.isAFavorite(restaurant) ? '<3' : <button onClick={() => this.handleFavoriteClick(restaurant)}>Add to Favorites</button>}</p>
                            </div>)
                    }
                </div>
            </div>)



    }
}
