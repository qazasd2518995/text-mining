# Text Mining Tutorial in R - Simplified Shinylive Version
library(shiny)
library(shinydashboard)

# Simple UI
ui <- dashboardPage(
  dashboardHeader(title = "Text Mining Tutorial in R"),
  
  dashboardSidebar(
    sidebarMenu(
      menuItem("Getting Started", tabName = "intro", icon = icon("play")),
      menuItem("Text Basics", tabName = "basics", icon = icon("font")),
      menuItem("Word Frequency", tabName = "frequency", icon = icon("chart-bar")),
      menuItem("Word Clouds", tabName = "wordcloud", icon = icon("cloud")),
      menuItem("Practice Lab", tabName = "practice", icon = icon("code"))
    )
  ),
  
  dashboardBody(
    tabItems(
      # Introduction Tab
      tabItem(
        tabName = "intro",
        fluidRow(
          box(
            title = "Welcome to Text Mining with R!", status = "primary", solidHeader = TRUE, width = 12,
            h3("What is Text Mining?"),
            p("Text mining is the process of extracting meaningful information from unstructured text data."),
            
            h4("What Can You Do?"),
            tags$ul(
              tags$li("Analyze customer feedback"),
              tags$li("Study social media sentiment"),
              tags$li("Create word clouds"),
              tags$li("Find text patterns")
            )
          )
        ),
        
        fluidRow(
          box(
            title = "Your First Analysis", status = "success", solidHeader = TRUE, width = 6,
            textAreaInput("intro_code", "R Code:", 
                         value = "# Your first text analysis\ntext <- \"Text mining is fun and useful\"\nwords <- strsplit(text, \" \")[[1]]\nprint(words)\nlength(words)",
                         rows = 6, width = "100%"),
            actionButton("run_intro", "Run Code", class = "btn-success"),
            br(), br(),
            h5("Output:"),
            verbatimTextOutput("intro_output")
          ),
          
          box(
            title = "Text Mining Steps", status = "info", solidHeader = TRUE, width = 6,
            tags$ol(
              tags$li("Data Collection"),
              tags$li("Text Preprocessing"),
              tags$li("Analysis"),
              tags$li("Visualization")
            )
          )
        )
      ),
      
      # Text Basics Tab
      tabItem(
        tabName = "basics",
        fluidRow(
          box(
            title = "Basic Text Operations", status = "primary", solidHeader = TRUE, width = 12,
            p("Learn fundamental text manipulation in R:"),
            column(6,
              h5("String Functions:"),
              tags$pre("nchar(text)    # Count characters\ntoupper(text)  # Uppercase\ntolower(text)  # Lowercase\nsubstr(text, 1, 5)  # Substring")
            ),
            column(6,
              h5("Pattern Matching:"),
              tags$pre("grep('word', text)  # Find pattern\ngsub('old', 'new', text)  # Replace\ngrepl('word', text)  # Test match")
            )
          )
        ),
        
        fluidRow(
          box(
            title = "Practice", status = "success", solidHeader = TRUE, width = 12,
            textAreaInput("basics_code", "Try it:",
                         value = "# Sample text\nmy_text <- \"R is great for Data Science!\"\n\n# Basic operations\nprint(paste(\"Original:\", my_text))\nprint(paste(\"Length:\", nchar(my_text)))\nprint(paste(\"Lowercase:\", tolower(my_text)))\nprint(paste(\"First 10 chars:\", substr(my_text, 1, 10)))",
                         rows = 8, width = "100%"),
            actionButton("run_basics", "Run Code", class = "btn-success"),
            br(), br(),
            verbatimTextOutput("basics_output")
          )
        )
      ),
      
      # Word Frequency Tab
      tabItem(
        tabName = "frequency",
        fluidRow(
          box(
            title = "Word Frequency Analysis", status = "primary", solidHeader = TRUE, width = 12,
            p("Analyze which words appear most often in your text.")
          )
        ),
        
        fluidRow(
          box(
            title = "Frequency Analysis", status = "success", solidHeader = TRUE, width = 6,
            textAreaInput("freq_code", "Code:",
                         value = "# Sample texts\ntexts <- c(\n  \"Text mining is useful for data science\",\n  \"Data science involves analyzing data\",\n  \"Machine learning helps analyze patterns\"\n)\n\n# Combine and process\nall_text <- paste(texts, collapse = \" \")\ncleaned <- tolower(all_text)\nwords <- strsplit(cleaned, \" \")[[1]]\n\n# Remove common words\nstopwords <- c(\"is\", \"for\", \"and\", \"the\")\nwords <- words[!words %in% stopwords]\n\n# Count frequencies\nfreq <- table(words)\nfreq_sorted <- sort(freq, decreasing = TRUE)\n\nprint(\"Top words:\")\nprint(head(freq_sorted, 5))",
                         rows = 12, width = "100%"),
            actionButton("run_freq", "Run Code", class = "btn-success")
          ),
          
          box(
            title = "Results", status = "info", solidHeader = TRUE, width = 6,
            verbatimTextOutput("freq_output"),
            plotOutput("freq_plot", height = "200px")
          )
        )
      ),
      
      # Word Cloud Tab
      tabItem(
        tabName = "wordcloud",
        fluidRow(
          box(
            title = "Word Clouds", status = "primary", solidHeader = TRUE, width = 12,
            p("Create visual representations of word frequencies.")
          )
        ),
        
        fluidRow(
          box(
            title = "Create Word Cloud", status = "success", solidHeader = TRUE, width = 6,
            textAreaInput("wc_text", "Enter your text:",
                         value = "Data science machine learning artificial intelligence statistics analytics big data visualization programming R Python algorithms models prediction analysis research innovation technology",
                         rows = 4, width = "100%"),
            sliderInput("max_words", "Max words:", min = 10, max = 50, value = 20),
            actionButton("create_wc", "Create Word Cloud", class = "btn-success")
          ),
          
          box(
            title = "Word Cloud", status = "info", solidHeader = TRUE, width = 6,
            plotOutput("wordcloud_plot", height = "300px")
          )
        )
      ),
      
      # Practice Lab Tab
      tabItem(
        tabName = "practice",
        fluidRow(
          box(
            title = "Practice Lab", status = "primary", solidHeader = TRUE, width = 12,
            h4("Try These Challenges:"),
            div(style = "background: #e8f5e8; border-left: 4px solid #4caf50; padding: 10px; margin: 10px 0;",
                h5("Challenge 1: Text Cleaning"),
                p("Clean this text: 'Hello!!! This is 123 MESSY text with punctuation...'")
            ),
            div(style = "background: #e8f5e8; border-left: 4px solid #4caf50; padding: 10px; margin: 10px 0;",
                h5("Challenge 2: Word Count"),
                p("Count unique words in a sentence.")
            )
          )
        ),
        
        fluidRow(
          box(
            title = "Your Code", status = "success", solidHeader = TRUE, width = 6,
            textAreaInput("practice_code", "Practice Area:",
                         value = "# Practice here - try the challenges!\n\n# Challenge 1: Clean messy text\nmessy_text <- \"Hello!!! This is 123 MESSY text...\"\n\n# Convert to lowercase\ncleaned <- tolower(messy_text)\nprint(paste(\"Original:\", messy_text))\nprint(paste(\"Cleaned:\", cleaned))",
                         rows = 10, width = "100%"),
            actionButton("run_practice", "Run Code", class = "btn-success")
          ),
          
          box(
            title = "Output", status = "info", solidHeader = TRUE, width = 6,
            verbatimTextOutput("practice_output"),
            br(),
            h5("Quick Reference:"),
            tags$ul(
              tags$li("tolower(), toupper()"),
              tags$li("gsub(), grep()"),
              tags$li("strsplit(), paste()"),
              tags$li("table(), sort()")
            )
          )
        )
      )
    )
  )
)

# Server logic
server <- function(input, output, session) {
  
  # Introduction tab
  observeEvent(input$run_intro, {
    output$intro_output <- renderText({
      tryCatch({
        result <- capture.output({
          eval(parse(text = input$intro_code))
        })
        paste(result, collapse = "\n")
      }, error = function(e) {
        paste("Error:", e$message)
      })
    })
  })
  
  # Basics tab
  observeEvent(input$run_basics, {
    output$basics_output <- renderText({
      tryCatch({
        result <- capture.output({
          eval(parse(text = input$basics_code))
        })
        paste(result, collapse = "\n")
      }, error = function(e) {
        paste("Error:", e$message)
      })
    })
  })
  
  # Frequency tab
  observeEvent(input$run_freq, {
    output$freq_output <- renderText({
      tryCatch({
        result <- capture.output({
          eval(parse(text = input$freq_code))
        })
        paste(result, collapse = "\n")
      }, error = function(e) {
        paste("Error:", e$message)
      })
    })
    
    # Create simple plot
    output$freq_plot <- renderPlot({
      tryCatch({
        eval(parse(text = input$freq_code))
        if (exists("freq_sorted") && length(freq_sorted) > 0) {
          barplot(head(freq_sorted, 5), 
                 main = "Top 5 Words", 
                 col = "steelblue",
                 las = 2)
        }
      }, error = function(e) {
        plot.new()
        text(0.5, 0.5, paste("Error:", e$message), cex = 1.2, col = "red")
      })
    })
  })
  
  # Word cloud tab
  observeEvent(input$create_wc, {
    output$wordcloud_plot <- renderPlot({
      tryCatch({
        text_data <- input$wc_text
        words <- strsplit(tolower(text_data), "\\s+")[[1]]
        words <- words[words != ""]
        
        # Simple frequency count
        word_freq <- table(words)
        word_freq <- sort(word_freq, decreasing = TRUE)
        word_freq <- head(word_freq, input$max_words)
        
        # Try wordcloud, fallback to barplot
        if (requireNamespace("wordcloud", quietly = TRUE)) {
          library(wordcloud)
          wordcloud(names(word_freq), freq = word_freq,
                   colors = rainbow(length(word_freq)),
                   random.order = FALSE)
        } else {
          # Fallback to barplot
          par(mar = c(8, 4, 2, 1))
          barplot(word_freq, 
                 main = "Word Frequencies",
                 col = rainbow(length(word_freq)),
                 las = 2)
        }
      }, error = function(e) {
        plot.new()
        text(0.5, 0.5, paste("Error:", e$message), cex = 1.2, col = "red")
      })
    })
  })
  
  # Practice tab
  observeEvent(input$run_practice, {
    output$practice_output <- renderText({
      tryCatch({
        result <- capture.output({
          eval(parse(text = input$practice_code))
        })
        paste(result, collapse = "\n")
      }, error = function(e) {
        paste("Error:", e$message)
      })
    })
  })
}

# Run the application
shinyApp(ui = ui, server = server)