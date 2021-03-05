import React, { Component } from 'react'
import { getFavorites, deleteFavorite } from '../api-utils.js';

export default class FavoritesPage extends Component {
    state = {
        favorites: []
    }

    componentDidMount = async () => {
        const favorites = await getFavorites(this.props.token);
        console.log(favorites)

        this.setState({ favorites })
    }

    handleDeleteFavoriteClick = async (e) => {
        await deleteFavorite(this.props.match.params.restaurantId, this.props.token);

    }
    render() {
        return (
            <div>
                <h2>Your Favorite Restaurants</h2>
                <div className="favorites">
                    {this.state.favorites.map(fav => <div className="favorite" key={`${fav.yelp_id}`}>
                        <img src={fav.image_url} alt={fav.yelp_id} />
                        <p>Restaurant name:{fav.name}</p>
                        <p>Rating:{fav.rating}</p>
                        <button onClick={this.handleDeleteFavoriteClick}>Remove from Favorites</button>

                    </div>)
                    }
                </div>
            </div>)

    }
}
