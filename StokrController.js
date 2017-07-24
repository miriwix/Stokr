/**
 * Created by mirif on 23/07/2017.
 */

(function () {
  'use strict';
  window.Stokr = window.Stokr || {};

  const consts = window.Stokr.Constants;
  const model = window.Stokr.Model;
  const view = window.Stokr.View;

  function init() {
    view.render(model.getState());
    view.setupEventListeners();
  }

  function toggleStocksStateAndRender() {
    model.setStocksViewState(model.getStocksViewState() === consts.STOCK_VIEW_STATES.length -1 ? 0 : model.getStocksViewState() + 1);
    view.render(model.getState());
  }

  function toggleFilterAndRender() {
    model.setFilterEnabled(!model.getFilterEnabled());
    view.render(model.getState());
  }

  function swapStocksOrder(currStockSymbol, shouldMoveUp) {
    const stocksOrder = model.getStocksOrder();
    const currLocation = stocksOrder.indexOf(currStockSymbol);
    const newLocation = shouldMoveUp ? currLocation - 1 : currLocation + 1;
    if (newLocation >= 0 && newLocation < stocksOrder.length) {
      const temp = stocksOrder[newLocation];
      stocksOrder[newLocation] = stocksOrder[currLocation];
      stocksOrder[currLocation] = temp;
    }
    model.setStocksOrder(stocksOrder);
    view.render(model.getState());
  }

  window.Stokr.Controller = {
    init,
    swapStocksOrder,
    toggleStocksStateAndRender,
    toggleFilterAndRender
  };


  window.Stokr.Controller.init();
})();

