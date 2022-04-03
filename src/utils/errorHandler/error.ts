export class AppError extends Error {
    private readonly _status
    constructor(props: { message: string; status: number }) {
        super(props.message)
        this._status = props.status

        if (this._status === 401) {
            window.location.href = '/'
        }
    }

    get status() {
        return this._status
    }
}
