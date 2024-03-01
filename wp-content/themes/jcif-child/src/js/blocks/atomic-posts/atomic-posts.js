class AtomicPostsBlock {
  constructor(blockElement) {
    this.blockElement = blockElement;
    this.init();
  }
  init() {
    console.log(this);
    console.log("Atomic Posts Working");

    this.ajaxUrl = this.blockElement.data("ajax-url");
    this.ajaxNonce = this.blockElement.data("ajax-nonce");
    this.postType = this.blockElement.data("post-type");
    this.defaultTaxQuery = JSON.stringify(
      this.blockElement.data("default-tax-query")
    );
    this.hasTaxQuery = this.blockElement.data("has-tax-query");
    this.postCount = this.blockElement.data("post-count");
    this.filterTerm = this.blockElement
      .find(".atomic-posts-filter")
      .data("filter-term");
    this.filterTax = this.blockElement
      .find(".atomic-posts-filter")
      .data("filter-tax");
    this.maxPages = this.blockElement.find(".atomic-posts").data("max-pages");
    this.enableLink = this.blockElement.data("enable-link");

    console.log("filterTerm = ", this.filterTerm);
    console.log("filterTax = ", this.filterTax);
    console.log("defaultTaxQuery = ", this.defaultTaxQuery);

    this.loader = this.blockElement.find(".filter-loader-wrapper");

    this.filter = this.blockElement.find(".atomic-posts-filter");

    this.setupEventListeners();
    this.postAjax();
  }

  setupEventListeners() {
    const that = this;

    // Find the Search input and detect any input
    this.blockElement.find(".atomic-posts-search").on("input", function () {
      that.searchValue = this.value;
      // Run post ajax
      that.postAjax(that.filterTax, that.filterTerm);
    });

    // Find the Filter dropdown list and detect clicks on it
    this.filter.find(".filter-list").on("click", function () {
      console.log("filter working");
      // If the list is already open then removde the "open" class
      if ($(this).hasClass("filter-list-open")) {
        $(this).removeClass("filter-list-open");
        // If the list is not already open then add the "open" class to it
      } else {
        $(this).addClass("filter-list-open");
      }
    });

    this.filter.find(".filter-link").on("click", function () {
      if ($(this).hasClass("active")) {
        return;
      }

      that.filter.find(".filter-item").removeClass("active");
      that.filter.find(".filter-link").removeClass("active");
      $(this).parent("li").addClass("active");
      $(this).addClass("active");
      that.filterTerm = $(this).data("term");
      that.filterTax = $(this).data("tax");

      console.log("Filter tax is ", that.filterTax);
      console.log("Filter term is ", that.filterTerm);
      that.postAjax(that.filterTax, that.filterTerm);
    });
  }

  postAjax() {
    this.loader.show();

    $.ajax({
      type: "POST",
      url: this.ajaxUrl,
      dataType: "json",
      data: {
        action: "filter_atomic_posts",
        nonce: this.ajaxNonce,
        postType: this.postType,
        term: this.filterTerm,
        tax: this.filterTax,
        defaultTaxQuery: this.defaultTaxQuery,
        filterTerm: this.filterTerm,
        filterTax: this.filterTax,
        maxPages: this.maxPages,
        searchValue: this.searchValue,
        hasTaxQuery: this.hasTaxQuery,
        postCount: this.postCount,
        enableLink: this.enableLink,
      },
      success: (res) => {
        console.log(res);

        this.blockElement.find(".atomic-posts-pagination-wrapper").pagination({
          dataSource: res.post_data,
          totalNumber: res.post_count,
          pageSize: this.postCount,
          showPageNumbers: true,
          prevText: "Prev",
          nextText: "Next",
          autoHidePrevious: true,
          autoHideNext: true,
          callback: (data, pagination) => {
            var dataHtml = "";
            $.each(data, function (index, item) {
              dataHtml += item;
            });
            this.blockElement.find(".atomic-posts").html(dataHtml);
          },
        });

        this.loader.hide();
        console.log(res);
      },
      error: (result, error, syn) => {
        console.log("ERROR");
        console.log(result);
        console.log(error);
        console.log(syn);
      },
    });
  }
}

// Initialize for each block instance
$(".atomic-posts-block").each(function () {
  new AtomicPostsBlock($(this));
});
