export default class Card {
  constructor(card) {
    this._card = card;
  }

  _getTemplate() {
    return document
      .querySelector(".review-template")
      .content.querySelector(".reviews__item")
      .cloneNode(true);
  }

  _getFio() {
    const lastName = this._card.lastName ? this._card.lastName[0] + "." : "";
    return this._card.firstName + " " + lastName;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".reviews__name").textContent = this._getFio();

    const rank = this._element.querySelector(".reviews__rank");
    for (let i = 0; i < this._card.rank; i++) {
      rank.insertAdjacentHTML(
        "beforeend",
        '<span class="reviews__heart-icon"></span>'
      );
    }

    this._element.querySelector(".reviews__date").textContent =
      this._card.created;

    this._element.querySelector(".reviews__text").textContent = this._card.text;

    this._element.querySelector(".reviews__answer").textContent =
      this._card.answer;

    return this._element;
  }
}
