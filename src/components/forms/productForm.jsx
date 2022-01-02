import React from "react";
import Joi from "joi-browser";
import MainForm from "./mainForm";
import {getGenres} from "../../services/genreService";
import {getProduct, saveProduct} from "../../services/productService";

class ProductForm extends MainForm {
    state = {
        data: {
            name: "",
            genreId: ""
          },
        genres: [],
        errors: {}
    };

    schema = {
        name: Joi
            .string()
            .required()
            .min(3)
            .label('Name'),

        genreId: Joi
            .string()
            .required()
            .label('Genre'),

    };

    async populateGenre() {
      const { data: genres } = await getGenres();
      this.setState({ genres });
    };

    async populateProduct() {
        const { history, match } = this.props;
      try {
          const productId = match.params.id;
          if (productId === "new") return;

          const { data: product } = await getProduct(productId);
          this.setState({ data: this.mapToViewModel(product) });
      }
      catch (e) {
          if (e.response && e.response.status === 404)
              history.replace("/notfound");
      }
    };

    async componentDidMount() {
        await this.populateGenre();
        await this.populateProduct();
    }

    render() {
        const { genres } = this.state;
        return(
            <React.Fragment>
                <form>
                    { this.renderInputForm("name", "Name", "Product-Name") }
                    { this.renderSelect("genreId", "Genre", genres) }
                    { this.renderButton("btn-outline-success", "Add", this.handleSubmit, this.validate()) }
                </form>

            </React.Fragment>

        );
    }

    mapToViewModel(product) {
        return {
          name: product.name,
          genreId: product.genre._id
        };
    };


    doSubmit = async () => {
        const { data } = this.state;
        const { history } = this.props;

        await saveProduct(data);
        return history.replace("/products");
    };
}

export default ProductForm;