export interface GraphHandlerReturnType {
    numerical: number[],
    percentChange: number,
    total: number,
    status: "red" | "green" | "neutral"
}

export const salesGraphHandler = (s: any): GraphHandlerReturnType => {
    const pChange: number = 0
    return {
        numerical: [],
        percentChange: pChange,
        total: 0,
        status: pChange === 0 ? "neutral" : pChange > 0 ? "green" : "red"
    }
}


export const revenueGraphHandler = (s: any): GraphHandlerReturnType => {
    const pChange: number = -2
    return {
        numerical: [],
        percentChange: pChange,
        total: 0,
        status: pChange === 0 ? "neutral" : pChange > 0 ? "green" : "red"
    }
}


export const descendantsGraphHandler = (s: any): GraphHandlerReturnType => {
    const pChange: number = 2
    return {
        numerical: [],
        percentChange: pChange,
        total: 0,
        status: pChange === 0 ? "neutral" : pChange > 0 ? "green" : "red"
    }
}
