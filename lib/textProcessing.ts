// Text processing utilities - JavaScript equivalents of R text mining functions

export interface WordFrequency {
  word: string;
  frequency: number;
}

// Basic stopwords list (equivalent to common English stopwords in R)
export const STOPWORDS = new Set([
  'the', 'and', 'is', 'it', 'was', 'of', 'to', 'a', 'an', 'in', 'on', 'at', 
  'for', 'with', 'by', 'from', 'as', 'be', 'are', 'been', 'being', 'have', 
  'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 
  'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 
  'you', 'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 
  'my', 'your', 'his', 'her', 'our', 'their', 'myself', 'yourself', 
  'himself', 'herself', 'ourselves', 'themselves', 'but', 'or', 'if', 
  'because', 'when', 'where', 'how', 'what', 'which', 'who', 'whom', 'whose'
]);

// Text preprocessing functions
export class TextProcessor {
  // Convert to lowercase (equivalent to tolower() in R)
  static toLowerCase(text: string): string {
    return text.toLowerCase();
  }

  // Convert to uppercase (equivalent to toupper() in R)
  static toUpperCase(text: string): string {
    return text.toUpperCase();
  }

  // Remove punctuation (equivalent to removePunctuation() in R's tm package)
  static removePunctuation(text: string): string {
    return text.replace(/[^\w\s]/g, ' ');
  }

  // Remove numbers (equivalent to removeNumbers() in R's tm package)
  static removeNumbers(text: string): string {
    return text.replace(/\d+/g, ' ');
  }

  // Strip extra whitespace (equivalent to stripWhitespace() in R)
  static stripWhitespace(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }

  // Tokenize text into words
  static tokenize(text: string): string[] {
    return text.split(/\s+/).filter(word => word.length > 0);
  }

  // Remove stopwords (equivalent to removeWords() in R)
  static removeStopwords(words: string[], customStopwords?: Set<string>): string[] {
    const stopwordSet = customStopwords || STOPWORDS;
    return words.filter(word => !stopwordSet.has(word.toLowerCase()));
  }

  // Basic stemming (simplified version - R uses SnowballC package)
  static simpleStem(word: string): string {
    // Very basic stemming - remove common suffixes
    word = word.toLowerCase();
    
    // Remove 'ing' suffix
    if (word.endsWith('ing') && word.length > 4) {
      word = word.slice(0, -3);
    }
    
    // Remove 'ed' suffix
    if (word.endsWith('ed') && word.length > 3) {
      word = word.slice(0, -2);
    }
    
    // Remove 's' suffix for plural
    if (word.endsWith('s') && word.length > 2 && !word.endsWith('ss')) {
      word = word.slice(0, -1);
    }
    
    return word;
  }

  // Full preprocessing pipeline
  static preprocess(text: string, options: {
    removeNumbers?: boolean;
    removePunctuation?: boolean;
    removeStopwords?: boolean;
    stem?: boolean;
    customStopwords?: Set<string>;
  } = {}): string[] {
    let processed = this.toLowerCase(text);
    
    if (options.removeNumbers !== false) {
      processed = this.removeNumbers(processed);
    }
    
    if (options.removePunctuation !== false) {
      processed = this.removePunctuation(processed);
    }
    
    processed = this.stripWhitespace(processed);
    let words = this.tokenize(processed);
    
    if (options.removeStopwords !== false) {
      words = this.removeStopwords(words, options.customStopwords);
    }
    
    if (options.stem) {
      words = words.map(word => this.simpleStem(word));
    }
    
    return words.filter(word => word.length > 0);
  }

  // Calculate word frequencies
  static calculateFrequencies(words: string[]): WordFrequency[] {
    const frequencyMap = new Map<string, number>();
    
    words.forEach(word => {
      frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    });
    
    return Array.from(frequencyMap.entries())
      .map(([word, frequency]) => ({ word, frequency }))
      .sort((a, b) => b.frequency - a.frequency);
  }

  // Get top N words
  static getTopWords(frequencies: WordFrequency[], n: number = 10): WordFrequency[] {
    return frequencies.slice(0, n);
  }

  // Calculate basic text statistics
  static getTextStats(text: string): {
    characters: number;
    words: number;
    sentences: number;
    avgWordsPerSentence: number;
  } {
    const characters = text.length;
    const words = this.tokenize(text.replace(/[^\w\s]/g, ' ')).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const avgWordsPerSentence = sentences > 0 ? Math.round((words / sentences) * 100) / 100 : 0;
    
    return {
      characters,
      words,
      sentences,
      avgWordsPerSentence
    };
  }

  // Create n-grams
  static createNGrams(words: string[], n: number = 2): string[] {
    if (words.length < n) return [];
    
    const ngrams: string[] = [];
    for (let i = 0; i <= words.length - n; i++) {
      ngrams.push(words.slice(i, i + n).join(' '));
    }
    
    return ngrams;
  }
}